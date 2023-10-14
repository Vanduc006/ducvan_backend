import fetch from 'node-fetch';
import mysql  from 'mysql'
// Tạo kết nối đến cơ sở dữ liệu

let i = 0
while (i < 200) {
  fetchImageURL()
  i++;
}
async function fetchImageURL() {
    try {
      const response = await fetch('https://picsum.photos/1280/1280/?random');
      const imageURL = response.url; // Truy cập đường dẫn từ thuộc tính 'url'
      console.log('Img :',imageURL)
      insert(imageURL)
    } catch (error) {
      console.log('Erro')
    }
  }

// function insert(url) {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "@Matkhau12345",
//     database: "ducvan"
// });
//   connection.connect((err) => {
//     if (err) {
//       console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
//       return;
//     }
//     console.log('Kết nối thành công đến cơ sở dữ liệu');
    
//     // Dữ liệu để chèn vào bảng
//     const userData = {
//       authors: 'Van Duc',
//       idimages: 1,
//       urlimages: url,
//       datecreate: new Date(),
//       modals: 'Random Img',
//       prompt: 'This is random img from API',
//       settings: 'Default settings',
//       isdelete: 'false'
//     };
  
//     // Truy vấn SQL để chèn dữ liệu
//     const sql = 'INSERT INTO user_images SET ?';
  
//     // Thực hiện truy vấn chèn dữ liệu
//     connection.query(sql, userData, (err, result) => {
//       if (err) {
//         console.error('Lỗi chèn dữ liệu:', err);
//       } else {
//         console.log('Dữ liệu đã được chèn thành công!');
//       }
  
//       // Đóng kết nối đến cơ sở dữ liệu sau khi hoàn thành
//       connection.end();
//     });
// });
// }


import { createClient } from '@supabase/supabase-js';

// Khởi tạo một kết nối đến Supabase
const supabase = createClient('https://myfdqawmzovlouhecepo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZmRxYXdtem92bG91aGVjZXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyMjA4NTUsImV4cCI6MjAxMjc5Njg1NX0.8UXB-5owTd7tudPSVR80j7pQCSuNON342wGVWvXZXZU');
async function insert(url) {
  try {
    // Dữ liệu để chèn vào bảng
    const userData = {
      authors: 'Van Duc',
      idimages: 1,
      urlimages: url,
      datecreate: new Date(),
      modals: 'Random Img',
      prompt: 'This is random img from API',
      settings: 'Default settings',
      isdelete: 'false'
    };

    // Chèn dữ liệu vào bảng user_images trong Supabase
    const { data, error } = await supabase.from('user_images').upsert([userData]);

    if (error) {
      console.error('Lỗi chèn dữ liệu vào Supabase:', error);
    } else {
      console.log('Dữ liệu đã được chèn vào Supabase thành công!');
    }
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

