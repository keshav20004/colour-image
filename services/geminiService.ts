
import { GoogleGenAI, Modality } from "@google/genai";

export async function colorizeAndEnhanceImage(base64ImageData: string, mimeType: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = "Colorize this black and white image and upscale it to a photorealistic 4K resolution. Add vibrant, natural colors while preserving the original details and composition.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            throw new Error("No image data found in the API response.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
}
