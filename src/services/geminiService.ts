/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { Era } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const getHistoricalInsights = async (era: Era, query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{
            text: `You are Chronos, a cinematic AI time travel guide. 
            The user is currently at the era: ${era.name} (${era.year}).
            Description: ${era.description}
            
            User Question/Prompt: ${query}
            
            Provide a mysterious, cinematic, yet historically accurate (or theoretically plausible for future) response. 
            Keep it under 150 words. Use Markdown for formatting. 
            If the user asks about time paradoxes, explain them with a hint of danger.`
          }]
        }
      ],
      config: {
        temperature: 0.9,
        topP: 0.95,
        topK: 64,
      }
    });

    return response.text || "The temporal currents are too turbulent to provide an answer right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the Chrono-Network. Please check your temporal uplink.";
  }
};
