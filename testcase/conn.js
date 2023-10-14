import mysql from 'mysql'
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Matkhau12345",
    database: "ducvan"
  });
  
// var sql = "CREATE TABLE users (id, username VARCHAR(20), password VARCHAR(20), level, email, daylycoins, usedcoins, favorite, datecreate, ipadress)";
var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(20),lastname VARCHAR(20),username VARCHAR(20),password VARCHAR(20),level VARCHAR(255),email VARCHAR(255),daylycoins INT,usedcoins INT,favorite VARCHAR(255),datecreate TIMESTAMP,ipadress VARCHAR(255));";

console.log(con.query(sql))