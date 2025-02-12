import genAI from "../../cotrollers/ConnectGemini.js";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "Explain how AI works";
const result = await model.generateContent(prompt);
console.log(result.response.text());

// gemini-2.0-flash-exp