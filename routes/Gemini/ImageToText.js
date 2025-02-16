import genAI from "../../cotrollers/ConnectGemini.js";
import { MarkdownRespone } from "../../component.js/MarkdownRespone.js";
export default async function ImageToText(model_gemini, prompt_gemini, callback) {
    const model = genAI.getGenerativeModel({ model: model_gemini });
    // const prompt = "Explain how AI works";
    const result = await model.generateContent(prompt_gemini);
    // console.log(result.response.text());
    callback(result.response.text())
}
// prompt = 
// ImageToText('gemini-2.0-flash',)

export function Test(callback) {
    const markdownContent = `
        # 🇻🇳 Tự Hào Là Người Việt Nam 🇻🇳  

        Việt Nam - một đất nước nhỏ bé nhưng mang trong mình lịch sử hào hùng, tinh thần bất khuất và văn hóa đậm đà bản sắc dân tộc.  

        ## 🌾 Đất Nước Hình Chữ S  
        Nằm bên bờ Biển Đông, Việt Nam mang vẻ đẹp thiên nhiên tuyệt vời, từ **ruộng bậc thang Sapa**, **vịnh Hạ Long kỳ vĩ**, đến **miền Tây sông nước**. Một dải đất hình chữ S, nơi mà con người luôn cần cù, chịu khó và kiên cường trước mọi thử thách.  

        ## 💪 Tinh Thần Bất Khuất  
        Từ thời **Bà Trưng, Bà Triệu**, đến **Hào khí Đông A**, rồi cuộc chiến tranh chống **thực dân, đế quốc**, Việt Nam luôn đứng lên bảo vệ độc lập, chủ quyền dân tộc.  
        > "Không có gì quý hơn độc lập, tự do!" - Chủ tịch Hồ Chí Minh  

        ## 🎨 Văn Hóa Đậm Đà Bản Sắc  
        Người Việt Nam luôn gìn giữ những giá trị truyền thống:  
        - **Áo dài, nón lá** - biểu tượng của vẻ đẹp thanh lịch  
        - **Bánh chưng, bánh tét** - hương vị Tết cổ truyền  
        - **Lòng hiếu khách, tinh thần đoàn kết** - điều làm nên bản sắc người Việt  

        ## 🚀 Việt Nam Vươn Ra Thế Giới  
        Ngày nay, Việt Nam không ngừng phát triển, ghi dấu ấn trên bản đồ thế giới với những thành tựu về **kinh tế, khoa học, công nghệ, thể thao**.  
        - **Cầu thủ Quang Hải, Công Phượng** đưa bóng đá Việt Nam vươn xa  
        - **VinFast, Viettel, FPT** khẳng định vị thế công nghệ Việt  
        - **Đội ngũ trẻ sáng tạo, đam mê** mang trí tuệ Việt ra toàn cầu  

        🔥 **Là người Việt Nam, tôi tự hào!**  
        🇻🇳 **Việt Nam muôn năm!** 🇻🇳  

    `;

    MarkdownRespone(markdownContent, (result) => {
        console.log(result);
        callback(result);
    });
}

// gemini-2.0-flash-exp
// 	models/gemini-2.0-flash