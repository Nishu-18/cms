"use server"
import { GoogleGenAI } from "@google/genai";

export async function AIContent({ text, customInstructions = "", contentGen = false }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  let basePrompt;
  if (contentGen) {
    basePrompt = `You are a senior and experienced content writer. 
    
    The content topic is: ${text}
    Custom instructions: ${customInstructions}
    Write the output strictly in clean HTML format for a rich text editor. 
    - Use <h1>, <h2>, <h3> for headings. 
    - Use <p> for paragraphs. 
    - Use <ul>/<ol> and <li> for lists. 
    - Do not use Markdown (#, *, **). 
    - Do not include <html>, <head>, or <body> tags. Only provide the content section.
    `;
    
  } else {
    basePrompt = `You are a senior content reviewer. 
    
    Rewrite this in easy-to-understand language: ${text}
    Instructions: ${customInstructions}
     - Do not use Markdown (#, *, **). 
    - Do not include <html>, <head>, or <body> tags. Only provide the content section.`
  }

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: basePrompt }] }], 
    });

    console.log(res.text);
    return res.text;
  } catch (error) {
    console.error("AI Error:", error.message);
    return null;
  }
}

    