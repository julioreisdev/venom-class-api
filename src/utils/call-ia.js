import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import { promptIA } from "./prompt-ia.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function callGemini(userInput, context) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Responda a pergunta: ${userInput} com as seguintes coonsiderações ${promptIA} e com leve em conta o contexto da conversa que é esse: ${context}`,
    config:{
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  });
  return response.text;
}


export default callGemini