const {
  sqlExecute_ObjectValues,
  //   sqlExecute_ArrayValues,
} = require('../utils/dbHelpers');

const table = 'likes';

async function lecturesLikesDB(validValues) {
  // console.log('lecturesLikes, validValues', validValues);

  const sql = `
        SELECT * from ${table}
        WHERE LectureID = ? 
    `;

  return sqlExecute_ObjectValues(sql, [validValues]);
}
async function AddLikeDB(validValues) {
  // console.log('updateRequestDB, validValues', validValues);

  const sql = `
        INSERT INTO ${table} (LectureID, UserID, Clicked) 
        VALUES (?, ?, TRUE)
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}
async function changeLikeDB(validValues) {
  // console.log('updateRequestDB, validValues', validValues);

  const sql = `
        UPDATE ${table}
        SET 
            Clicked = ?
        WHERE UserID = ? AND LectureID = ?
    `;

  return sqlExecute_ObjectValues(sql, validValues);
}

module.exports = { AddLikeDB, lecturesLikesDB, changeLikeDB };
