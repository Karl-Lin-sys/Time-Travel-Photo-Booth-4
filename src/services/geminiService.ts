import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeFace(base64Image: string, mimeType: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: 'Analyze this photo of a person. Describe their facial features, expression, hair, and the lighting on their face in detail. Keep it concise but descriptive. Do not describe the background or current clothing.'
        }
      ]
    }
  });
  return response.text || '';
}

export async function generateTimeTravelImage(base64Image: string, mimeType: string, eraPrompt: string, faceDescription: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: `Edit this image to transport the person to a historical era. 
Era setting: ${eraPrompt}. 
Change their clothing to match the era perfectly. 
Change the background to match the era perfectly. 
CRITICAL: The person's face must remain exactly the same. 
Person's face description for reference: ${faceDescription}. 
Make it look highly realistic and cinematic.`
        }
      ]
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}
