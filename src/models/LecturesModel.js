const { sqlExecute_ObjectValues } = require('../utils/dbHelpers');

const table = 'lectures';

async function createLectureDB(validValues) {
  // console.log('createLectureDB, validValues', validValues);

  const sql = `
        INSERT INTO ${table}
        ( AuthorID, Title, Brief, Content )
        VALUES (?, ?, ?, ?) 
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}
async function getLecturesDB() {
  //   console.log('getLecturesDB, validValues', validValues);

  const sql = `
        SELECT * from ${table}
    `;

  return sqlExecute_ObjectValues(sql, []);
}
async function getLectureByIDinDB(ID) {
  //   console.log('getLectureByIDinDB, validValues', validValues);

  const sql = `
        SELECT * from ${table}
        WHERE ID = ?
    `;

  return sqlExecute_ObjectValues(sql, [ID]);
}
async function myLecturesDB(ID) {
  //   console.log('myLecturesDB, validValues', validValues);

  const sql = `
        SELECT * from ${table}
        WHERE AuthorID = ?
    `;

  return sqlExecute_ObjectValues(sql, [ID]);
}

module.exports = {
  createLectureDB,
  myLecturesDB,
  getLecturesDB,
  getLectureByIDinDB,
};
