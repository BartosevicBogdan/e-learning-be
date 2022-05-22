const {
  sqlExecute_ObjectValues,
  //   sqlExecute_ArrayValues,
} = require('../utils/dbHelpers');

const table = 'users';

async function registrationRequestDB(validValues) {
  const sql = `
        INSERT INTO ${table}
        (Email, Password) VALUES (?, ?)
    `;
  return sqlExecute_ObjectValues(sql, validValues);
}
async function loginRequestDB(validValues) {
  const sql = `
   SELECT * FROM ${table} 
   WHERE Email = ? LIMIT 1 
   `;

  return sqlExecute_ObjectValues(sql, validValues);
}

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

module.exports = { registrationRequestDB, loginRequestDB, updateRequestDB };
