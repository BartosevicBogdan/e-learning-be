const { sqlExecute_ObjectValues } = require('../utils/dbHelpers');

const table = 'users';

async function registrationRequestDB(validValues) {
  // console.log('registrationRequestDB, validValues', validValues);

  const sql = `
        INSERT INTO ${table}
        (Email, Password) VALUES (?, ?)
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}
async function loginRequestDB(validValues) {
  // console.log('loginRequestDB, validValues', validValues);

  const sql = `
   SELECT * FROM ${table} 
   WHERE Email = ? LIMIT 1 
   `;

  return sqlExecute_ObjectValues(sql, validValues);
}

module.exports = { registrationRequestDB, loginRequestDB };
