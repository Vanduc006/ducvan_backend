import Replicate from "replicate";
import 'dotenv/config'
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
  {
    input: {
      prompt: "An astronaut riding a rainbow unicorn"
    }
  }
);
console.log(output)
// out put: https://pbxt.replicate.delivery/8FHhVn0AQ3YlBVbUS9OMpmPISHfiHHtWki8An8Vfx0WuUIjRA/out-0.png
// import 'dotenv/config'
// console.log(process.env.REPLICATE_API_TOKEN) // remove this after 