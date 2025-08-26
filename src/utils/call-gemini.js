import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt-ia.js";

const ai = new GoogleGenAI({});

export async function callGemini(message, history) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Responda isso ${message} a partir disso: ${prompt} seguindo o contexto da conversa que é esse ${history}}`,
    config:{
      thinkingConfig:{
        thinkingBudget: 0
      }
    }
  });

  return response.text
}