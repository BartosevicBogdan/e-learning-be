const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

function catchErrorObject(catchError, sqlRequestArguments) {
  const obj = {
    success: false,
    message: 'database catched error',
    sqlState: catchError.sqlState,
    sqlMessage: catchError.sqlMessage,
    enteredValues: sqlRequestArguments,
  };
  return obj;
}

async function sqlExecute_ObjectValues(sql, validValues) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [fields] = await conn.execute(sql, Object.values(validValues));
    await conn.close();
    return fields;
  } catch (error) {
    // console.log('error', error);
    return catchErrorObject(error, validValues);
  }
}
async function sqlExecute_ArrayValues(sql, validValues) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [fields] = await conn.execute(sql, validValues);
    await conn.close();
    return fields;
  } catch (error) {
    // console.log(error);
    return catchErrorObject(error, validValues);
  }
}

module.exports = {
  sqlExecute_ObjectValues,
  sqlExecute_ArrayValues,
};
