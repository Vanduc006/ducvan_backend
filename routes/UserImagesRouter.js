// import pool from '../cotrollers/ConnectDatabase.js';

// export function userListImage(author, page, callback) {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Lỗi kết nối cơ sở dữ liệu:', err);
//       callback('Connect Error');
//     } else {
//       const itemsPerPage = 8; // Số lượng ảnh mỗi trang
//       const offset = (page - 1) * itemsPerPage; // Vị trí bắt đầu lấy dữ liệu

//       const sql = 'SELECT * FROM user_images WHERE authors = ? ORDER BY id DESC LIMIT ? OFFSET ?';
//       const authorName = 'Van Duc'; // Giá trị của authors mà bạn muốn tìm (có thể thay đổi tùy ý)

//       connection.query(sql, [authorName, itemsPerPage, offset], (error, results) => {
//         if (error) {
//           callback('Get User List Images Fail');
//         }

//         const listUserImage = {
//           listimages: {
//             images: results.map((row) => ({
//               id: row.id,
//               authors: row.authors,
//               idimages: row.idimages,
//               urlimages: row.urlimages,
//               datecreate: row.datecreate,
//               modals: row.modals,
//               prompt: row.prompt,
//               settings: row.settings,
//               isdelete: row.isdelete,
//             })),
//           },
//         };

//         callback(JSON.stringify(listUserImage));
//         connection.release();
//       });
//     }
//   });
// }

import supabase from "../cotrollers/ConnectSupabase.js";
export function userListImage(author, page, callback) {
  const itemsPerPage = 8; // Số lượng ảnh mỗi trang
  const offset = (page - 1) * itemsPerPage; // Vị trí bắt đầu lấy dữ liệu
  const authorName = 'Van Duc'; // Giá trị của authors mà bạn muốn tìm (có thể thay đổi tùy ý)
  // Truy vấn dữ liệu từ bảng user_images
  supabase
    .from('user_images')
    .select('*')
    .eq('authors', authorName)
    .order('id', { ascending: false }) // Sắp xếp theo id giảm dần
    .range(offset, offset + itemsPerPage - 1) // Lấy dữ liệu từ vị trí offset
    .then(({ data, error }) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        callback('Get User List Images Fail');
      } else {
        const listUserImage = {
          listimages: {
            images: data.map((row) => ({
              id: row.id,
              authors: row.authors,
              idimages: row.idimages,
              urlimages: row.urlimages,
              datecreate: row.datecreate,
              modals: row.modals,
              prompt: row.prompt,
              settings: row.settings,
              isdelete: row.isdelete,
            })),
          },
        };

        callback(JSON.stringify(listUserImage));
      }
    })
    .catch((error) => {
      console.error('Lỗi:', error);
      callback('Connect Error');
    });
}
