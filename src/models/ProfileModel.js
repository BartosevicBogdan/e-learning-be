const {
  sqlExecute_ObjectValues,
  //   sqlExecute_ArrayValues,
} = require('../utils/dbHelpers');

const table = 'users';

async function updateRequestDB(validValues) {
  console.log('validValues', validValues);
  const sql = `
        UPDATE ${table}
        SET Password = ?,
            FirstName = ?, 
            LastName = ?, 
            DoB = ?
        WHERE ID = ? 
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}

module.exports = { updateRequestDB };
