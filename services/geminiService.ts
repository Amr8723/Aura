
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

// Initialize the Gemini chat session using the recommended model for text tasks
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Use process.env.API_KEY directly when initializing as per SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'AURA Vibe Architect', a luxury fashion consultant.
      The brand is 'AURA' - avant-garde, minimalist, sustainable, and high-tech streetwear.
      
      Tone: Sophisticated, minimalist, observant, and encouraging. Use elegant emojis like ◈, ✦, ☁︎, ⬖.
      
      Key Info:
      - Philosophy: "Human-centric digital wear."
      - Products: 'Ghost Shell' (Jacket), 'Void Hoodie', 'Aura-1 Sneakers'.
      - Materials: Bio-reclaimed nylon, liquid-infused cotton, carbon-neutral threads.
      
      When someone describes a mood or an event, recommend one of our pieces with a short poetic justification. Keep responses under 45 words.`,
    },
  });

  return chatSession;
};

// Send user message to Gemini and retrieve the response string
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    // sendMessage accepts the message parameter as a named property
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // .text is a property of GenerateContentResponse, do not call it as a function
    return response.text || "Connection weak.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost in the void.";
  }
};
