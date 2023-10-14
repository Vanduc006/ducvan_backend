import mysql from 'mysql'
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Matkhau12345",
    database: "ducvan"
  });
  
// var sql = "CREATE TABLE users (id, username VARCHAR(20), password VARCHAR(20), level, email, daylycoins, usedcoins, favorite, datecreate, ipadress)";
// var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(20),lastname VARCHAR(20),username VARCHAR(20),password VARCHAR(20),level VARCHAR(255),email VARCHAR(255),daylycoins INT,usedcoins INT,favorite VARCHAR(255),datecreate TIMESTAMP,ipadress VARCHAR(255));";
var sql = "CREATE TABLE user_images (id INT AUTO_INCREMENT PRIMARY KEY,authors VARCHAR(20),idimages INT,urlimages VARCHAR(1000),datecreate TIMESTAMP,modals VARCHAR(1000),prompt VARCHAR(1000),settings VARCHAR(1000),isdelete VARCHAR(1000));";
con.query(sql)
// url authors, idimages, images, datecreat, modals, prompt, settings, isdelete