import pool from '../cotrollers/ConnectDatabase.js';

export function createUser(firstname,lastname,username, password, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Lỗi kết nối cơ sở dữ liệu:', err);
            callback('Connect Error');
          } else {
            const sql_regtry = 'INSERT INTO users SET ?';
            const newUsser = {
                firstname: 'Văn',
                lastname: 'Đức',
                username: 'example_user',
                password: 'example_password',
                level: 'example_level',
                email: 'example@example.com',
                daylycoins: '10',
                usedcoins: '5',
                favorite: 'example_favorite',
                datecreate: new Date(), // Lấy thời gian hiện tại
                ipadress: '192.168.1.1'
              };
              connection.query(sql_regtry,newUsser,err,result => {
                if (err) {
                  console.error('Register False');
                  callback('Register False');
                } else {
                  console.log('Register True');
                  callback('Register True');
                }
              })
            }            
            // const sql_login = 'SELECT * FROM users WHERE username = ? AND password = ?';
            // connection.query(sql_login, [username, password], (err, results) => {
            //   if (err) {
            //     console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            //     callback('Connect Error');
            //   } else {
            //     if (results.length > 0) {
            //       console.log('Đăng nhập thành công');
                  
            //       callback('Login True');
            //     } else {
            //       console.log('Tên người dùng hoặc mật khẩu không đúng');
            //       callback('Login False');
            //     }
            //   }
            //   // Đóng kết nối đến cơ sở dữ liệu sau khi kiểm tra
            //   connection.release();
            // });
          })
}