const {
  sqlExecute_ObjectValues,
  //   sqlExecute_ArrayValues,
} = require('../utils/dbHelpers');

const table = 'users';

async function getUserDB(validValues) {
  // console.log('getUserDB, validValues', validValues);

  const sql = `
        SELECT Email, FirstName, LastName, DoB, Avatar
        from ${table}
        WHERE ID = ? 
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}
async function updateRequestDB(validValues) {
  // console.log('updateRequestDB, validValues', validValues);

  const sql = `
        UPDATE ${table}
        SET 
            FirstName = ?, 
            LastName = ?, 
            DoB = ?,
            Avatar =?
        WHERE ID = ? 
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}

module.exports = { updateRequestDB, getUserDB };
