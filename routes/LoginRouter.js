// // login.js
// import pool from '../cotrollers/ConnectDatabase.js';

// export function checkLogin(username, password, callback) {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Lỗi kết nối cơ sở dữ liệu:', err);
//       callback('Connect Error');
//     } else {
//       const sql_login = 'SELECT * FROM users WHERE username = ? AND password = ?';
//       connection.query(sql_login, [username, password], (err, results) => {
//         if (err) {
//           console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
//           callback('Connect Error');
//         } else {
//           if (results.length > 0) {
//             console.log('Đăng nhập thành công');
            
//             callback('Login True');
//           } else {
//             console.log('Tên người dùng hoặc mật khẩu không đúng');
//             callback('Login False');
//           }
//         }
//         // Đóng kết nối đến cơ sở dữ liệu sau khi kiểm tra
//         connection.release();
//       });
//     }
//   });
// }

import supabase from "../cotrollers/ConnectSupabase.js";
export async function checkLogin(username, password, callback) {
  try {
    // Truy vấn Supabase để kiểm tra xem có bản ghi nào khớp với tên người dùng và mật khẩu không
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password);

    if (error) {
      // console.error('Lỗi truy vấn cơ sở dữ liệu:', error);
      callback('Connect Error');
    } else {
      if (data && data.length > 0) {
        // console.log('Đăng nhập thành công');
        callback('Login True');
      } else {
        // console.log('Tên người dùng hoặc mật khẩu không đúng');
        callback('Login False');
      }
    }
  } catch (error) {
    console.error('Lỗi:', error);
    callback('Connect Error');
  }
}
