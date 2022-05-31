const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const tablesData = [
  {
    tableName: 'users',
    sql: `
      CREATE TABLE
        "users1" (
          "ID" int NOT NULL AUTO_INCREMENT,
          "Email" varchar(50) NOT NULL,
          "Password" varchar(255) NOT NULL,
          "FirstName" varchar(255) DEFAULT NULL,
          "LastName" varchar(255) DEFAULT NULL,
          "DoB" date DEFAULT NULL,
          "CreatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "IsArchived" tinyint(1) NOT NULL DEFAULT '0',
          "Avatar" varchar(255) DEFAULT NULL,
          PRIMARY KEY ("ID"),
          UNIQUE KEY "Email" ("Email")
        )
    `,
  },
  {
    tableName: 'lectures',
    sql: `
      CREATE TABLE
        "lectures" (
          "ID" int NOT NULL AUTO_INCREMENT,
          "AuthorID" int NOT NULL,
          "Title" varchar(255) NOT NULL,
          "Brief" varchar(255) DEFAULT NULL,
          "Content" text,
          "CreatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "Archived" tinyint(1) NOT NULL DEFAULT '0',
          PRIMARY KEY ("ID")
        )
    `,
  },
  {
    tableName: 'likes',
    sql: `
      CREATE TABLE
        "likes" (
          "ID" int unsigned NOT NULL AUTO_INCREMENT,
          "LectureID" int DEFAULT NULL,
          "UserID" int DEFAULT NULL,
          "Clicked" tinyint(1) NOT NULL DEFAULT '0',
          PRIMARY KEY ("ID")
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
