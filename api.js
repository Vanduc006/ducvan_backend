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
import * as fs from 'node:fs';

let allowedOrigins = [];
const whathost = process.env.HOST;

if (whathost === 'localhost') {
    allowedOrigins = ['http://127.0.0.1:5500'];
}
if (whathost === 'render') {
    allowedOrigins = [
        'https://learn-reactjs-chi-ten.vercel.app',
        'http://127.0.0.1:5500',
        'https://vanduc006.github.io',
        'https://cuddly-chainsaw-q59gwg69w57h9w47-5173.app.github.dev',
        'https://learn-reactjs-power.vercel.app',
        'https://5173-idx-learnreactjs-1737711060325.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev',
        
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
        res.status(500).json(err)
    } else {
        // console.log("Result:", result);
        res.status(200).json(result)
    }
  });
});

app.get('/translator', async function (req,res) {
  // read base 64 list from header 
  // const base64header = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVY'
  // res.send(base64header.replace(/^data:image\/\w+;base64,/, ""))

  // read url, maxx 4 images
  const urllist = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',

  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg'
  ]
  // console.log(urllist[0])
  // const imageResp = await fetch(
  //   urllist[0]
  // )
  // .then((response) => response.arrayBuffer());
  // console.log(imageResp)

  async function fileToGenerativeResp(url) {
    const work = await fetch(url).then((response) => response.arrayBuffer());
    return work;
  }

  console.log(await fileToGenerativeResp(urllist[0]));


  function fileToGenerativePart(resp, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(resp).toString('base64'),
        mimeType : mimeType,
      },
    };
  }
  const imagePart = fileToGenerativePart(await fileToGenerativeResp(urllist[0]), "image/jpg");
  // multi images 
  const systemconf = 'You are master of translator, I am a vistor ...'
  const prompt = [
      imagePart,
      'Translate this picture for me'
  ]
  // const imagePart = fileToGenerativePart("Screenshot from 2025-01-26 00-04-29.png", "image/png");
  res.send(imagePart)

})


const PORT = 5000;

app.listen(PORT,() => {
	console.log(`Running on PORT ${PORT}`);
})