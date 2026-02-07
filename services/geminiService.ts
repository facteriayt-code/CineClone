
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

export class GeminiService {
  // Following @google/genai guidelines: 
  // 1. Obtain API key exclusively from process.env.API_KEY.
  // 2. Instantiate GoogleGenAI right before making a call to ensure latest config/key.

  async getRecommendations(query: string, movies: Movie[]) {
    // Correct initialization with named parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const movieContext = movies.map(m => `ID: ${m.id}, Title: ${m.title}, Genre: ${m.genre.join(', ')}`).join('\n');
    
    try {
      // Use ai.models.generateContent directly with model name
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the following user query: "${query}", find the best matching movies from this list:\n\n${movieContext}\n\nReturn a JSON array of objects with "id" and a "reason" string (1 sentence explaining why it matches).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["id", "reason"]
            }
          }
        }
      });
      
      // Accessing the .text property directly (not a method)
      const text = response.text?.trim();
      if (!text) return [];
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      return [];
    }
  }

  async generateDescription(movieTitle: string) {
     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
     try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Give me a short, catchy, 2-sentence cinema style hook for the movie: ${movieTitle}`
      });
      // Accessing the .text property directly
      return response.text || null;
    } catch (error) {
      console.error("Gemini Description Error:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();
