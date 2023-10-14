import mysql from 'mysql';

// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Matkhau12345",
  database: "ducvan"
});

// Thực hiện câu truy vấn SQL
const sql = 'SELECT * FROM user_images WHERE authors = ? ORDER BY id LIMIT 10';
const authorName = 'Van Duc'; // Giá trị của authors mà bạn muốn tìm

connection.query(sql, [authorName], (error, results) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  // Tạo một đối tượng JSON chứa dữ liệu
  const responseData = {
    listimages: {
      images: results.map((row) => ({
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
  console.log(JSON.stringify(responseData,null,2))
  // Hiển thị dữ liệu dưới dạng JSON
//   console.log(JSON.stringify(responseData, null, 2));

  // Đóng kết nối sau khi hoàn thành
  connection.end();
});
