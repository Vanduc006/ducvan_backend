import mysql  from 'mysql'
// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Matkhau12345",
    database: "ducvan"
});
  
  // Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    return;
  }
  console.log('Kết nối thành công đến cơ sở dữ liệu');
  
  // Dữ liệu để chèn vào bảng
  const userData = {
    firstname: 'Văn',
    lastname: 'Đức',
    username: '2',
    password: 'example_password',
    level: 'example_level',
    email: 'example@example.com',
    daylycoins: '10',
    usedcoins: '5',
    favorite: 'example_favorite',
    datecreate: new Date(), // Lấy thời gian hiện tại
    ipadress: '192.168.1.1'
  };

  // Truy vấn SQL để chèn dữ liệu
  const sql = 'INSERT INTO users SET ?';

  // Thực hiện truy vấn chèn dữ liệu
  connection.query(sql, userData, (err, result) => {
    if (err) {
      console.error('Lỗi chèn dữ liệu:', err);
    } else {
      console.log('Dữ liệu đã được chèn thành công!');
    }

    // Đóng kết nối đến cơ sở dữ liệu sau khi hoàn thành
    connection.end();
  });
});
  