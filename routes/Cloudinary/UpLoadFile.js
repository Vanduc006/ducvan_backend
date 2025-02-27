import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.CLOUDINARY_API_SECRET)

// async function UpFileClouddinary () {
//     // const data_fuffer = Buffer.from(await fileToGenerativeResp(urllist[0])).toString('base64')
//     // const imagePart = "data:image/jpg;base64," + data_fuffer
//     // res.send(imagePart)
//     const uploadRespone = await cloudinary.uploader.upload(imagePart, {
//       folder: "uploads",
//     });
//     res.json({
//       success: true,
//       imageUrl: uploadRespone.secure_url, // Cloudinary Image URL
//     });
// }