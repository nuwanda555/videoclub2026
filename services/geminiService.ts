
import { GoogleGenAI } from "@google/genai";
import { Movie } from "../types";

export const getAIRecommendation = async (prompt: string, inventory: Movie[]) => {
  // Always use the required initialization with a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const inventorySummary = inventory.map(m => `${m.title} (${m.genre})`).join(', ');

  const fullPrompt = `
    Actúa como el encargado experto de un videoclub tradicional.
    Tengo las siguientes películas en inventario: ${inventorySummary}.
    
    El cliente pregunta: "${prompt}"
    
    Responde de forma amable, carismática y profesional. Si la película sugerida no está en el inventario, menciónalo pero recomienda alternativas similares que sí tengamos.
    Responde en formato Markdown elegante.
  `;

  try {
    // Query GenAI with the correct model and prompt structure as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
    });
    
    // Use .text property directly (not a method) to extract response content
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, mi conexión con la base de datos cinematográfica está fallando. ¿Podrías preguntarme de nuevo?";
  }
};
