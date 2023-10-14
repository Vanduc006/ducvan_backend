import readline from 'readline';
import mysql from 'mysql';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

  // Hàm kiểm tra tên người dùng và mật khẩu
  function checkCredentials(username, password) {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
      console.log(results)
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      } else {
        
        if (results.length > 0) {
          console.log('Đăng nhập thành công');
        } else {
          console.log('Tên người dùng hoặc mật khẩu không đúng');
        }
      }

      // Đóng kết nối đến cơ sở dữ liệu sau khi kiểm tra
      connection.end();
      rl.close();
    });
  }

  // Yêu cầu người dùng nhập tên người dùng và mật khẩu
  rl.question('Nhập tên người dùng: ', (username) => {
    rl.question('Nhập mật khẩu: ', (password) => {
      checkCredentials(username, password);
    });
  });
});
