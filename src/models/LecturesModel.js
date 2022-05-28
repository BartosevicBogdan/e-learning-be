const {
  sqlExecute_ObjectValues,
  //   sqlExecute_ArrayValues,
} = require('../utils/dbHelpers');

const table = 'lectures';

async function createLectureDB(validValues) {
  console.log('validValues', validValues);
  const sql = `
        INSERT INTO ${table}
        ( AuthorID, Title, Brief, Content )
        VALUES (?, ?, ?, ?) 
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}
async function getLecturesDB() {
  //   console.log('validValues', validValues);
  const sql = `
        SELECT * from ${table}
    `;

  return sqlExecute_ObjectValues(sql, []);
}
async function getLectureByIDinDB(ID) {
  //   console.log('validValues', validValues);
  const sql = `
        SELECT * from ${table}
        WHERE ID = ?
    `;

  return sqlExecute_ObjectValues(sql, [ID]);
}

module.exports = { createLectureDB, getLecturesDB, getLectureByIDinDB };
