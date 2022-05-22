const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const tablesData = [
  {
    tableName: 'user',
    sql: `
      CREATE TABLE users (
      ID int AUTO_INCREMENT PRIMARY KEY,
      Email varchar(50) NOT NULL UNIQUE,
      Password varchar(255) NOT NULL,
      FirstName varchar(255),
      LastName varchar(255),
      DoB date,
      CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      IsArchived BOOLEAN NOT NULL DEFAULT FALSE
      )
    `,
  },
];

const createTable = async (tables, table) => {
  try {
    if (!tables.find((x) => x.Tables_in_defaultdb === table.tableName)) {
      const con = await mysql.createConnection(dbConfig);
      const [data] = await con.execute(table.sql);
      await con.end();
      console.log(data);
    }
  } catch (err) {
    console.warn(
      'error occurred at setupDB file, createTable function, error:',
      err,
    );
  }
};

const setup = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [tables] = await con.execute('SHOW TABLES');
    console.log(tables);
    await con.end();

    tablesData.forEach((table) => createTable(tables, table));
  } catch (err) {
    console.warn('error occurred at setupDB file, setup function, error:', err);
  }
};

setup();
