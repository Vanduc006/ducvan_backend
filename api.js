//index.js
import express from 'express';
import axios from 'axios';
import morgan from 'morgan';
import cors from 'cors';
import { checkLogin } from './routes/LoginRouter.js'
import { createUser } from './routes/RegisterRouter.js'
import { userListImage } from './routes/UserImagesRouter.js'
import PhatNguoi from './routes/PhatNguoi.js';
import 'dotenv/config'
let allowedOrigins = [];
const whathost = process.env.HOST;

if (whathost === 'localhost') {
    allowedOrigins = ['http://127.0.0.1:5500'];
}
if (whathost === 'render') {
    allowedOrigins = [
        'http://127.0.0.1:5500',
        'https://vanduc006.github.io',
        'https://cuddly-chainsaw-q59gwg69w57h9w47-5173.app.github.dev',
    ]; // Add all allowed origins for "render"
}

const app = express();

// Dynamic CORS configuration
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an origin (e.g., mobile apps or Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the request
            } else {
                callback(new Error('Not allowed by CORS')); // Deny the request
            }
        },
    })
);
// app.use(morgan('combined'))
//https://vanduc006.github.io
//http://127.0.0.1:5500
app.use(express.json());

app.post('/userlistimages', (req, res) => {
  const author = req.body.author; // Đảm bảo rằng bạn đã định nghĩa trường 'author' trong yêu cầu
  const page = req.body.page || 1; // Mặc định là trang 1 nếu không có giá trị được gửi

  userListImage(author, page, (result) => {
    if (result === 'Connect Error') {
      res.status(500).json({ message: 'Lỗi kết nối cơ sở dữ liệu' });
    } else if (result === 'Get User List Images Fail') {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách hình ảnh của người dùng' });
    } else {
      const parsedResult = JSON.parse(result);
      res.status(200).json(parsedResult);
    }
  });
});


app.post('/register', (req,res) => {
  const requestRegister = req.body
  console.log(requestRegister)
})

app.post('/login', (req, res) => {
  // Lấy dữ liệu JSON từ yêu cầu của client
  const requestLogin = req.body;
  const username = requestLogin.username
  const password = requestLogin.password

  checkLogin(username, password, (result) => {


    if (result === 'Login True') {
      // Xử lý khi đăng nhập thành công
      
      res.json({login_status : 'True'});
    } else if (result === 'Login False') {
      // Xử lý khi đăng nhập không thành công
      res.json({login_status : 'False'});
    } else {
      // Xử lý lỗi kết nối
      res.json({login_status : 'Erro Connect'});
    }
  });
  // const username = { username : requestLogin.username}
  // res.json(username)
  // Kiểm tra nếu requestLogin chứa số và làm phép tính
  // if (typeof requestLogin.number === 'number') {
  //   // Thực hiện phép tính và trả kết quả về client
  //   const result = requestLogin.number * 2; // Phép nhân 2
  //   const responseData = { result };
  //   res.json(responseData);
  // } else {
  //   // Trường hợp dữ liệu không hợp lệ
  //   res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  // }
});

app.get('/',(req,res) => {
	res.send('<h1>haha</h1>');
})

app.post('/haha', (req, res) => {
    // res.send('POST request to the homepage')
    const imageOutput = 'https://pbxt.replicate.delivery/8FHhVn0AQ3YlBVbUS9OMpmPISHfiHHtWki8An8Vfx0WuUIjRA/out-0.png'
    const responseData = {
        output: imageOutput,
        // data: {
        //   key1: 'value1',
        //   key2: 'value2',
        // },
      };
    
      // Sử dụng .json() để gửi dữ liệu dưới dạng JSON
    res.json(responseData);
})

app.get('/phatnguoi', function(req, res) {
  // res.send("tagId is set to " + req.query.bienso);
  PhatNguoi(req.query.bienso, (err, result) => {
    if (err) {
        // console.error("Error:", err);
        res.status(500).send(err)
    } else {
        // console.log("Result:", result);
        res.status(200).send(result)
    }
});


});


const PORT = 5000;

app.listen(PORT,() => {
	console.log(`Running on PORT ${PORT}`);
})