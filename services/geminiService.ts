import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Helper to get client
const getClient = (apiKey: string) => new GoogleGenAI({ apiKey });

export const generatePsychAnalysis = async (apiKey: string, topic: string): Promise<string> => {
    try {
        const ai = getClient(apiKey);
        const prompt = `
        You are a criminal psychology expert and behavioral profiler (Mind Hunter).
        Analyze the following topic or channel description: "${topic}".
        
        Provide a psychological profile, target audience insight, and 3 key hooks that would trigger a dopamine response in this audience.
        Format with Markdown. Be concise, dark, and professional.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: "You are an elite FBI behavioral analyst.",
            }
        });

        return response.text || "No analysis generated.";
    } catch (error: any) {
        console.error("Gemini Error:", error);
        throw new Error(error.message || "Failed to analyze.");
    }
};

export const generateScript = async (apiKey: string, topic: string, duration: number, style: string, language: string): Promise<string> => {
    try {
        const ai = getClient(apiKey);
        const prompt = `
        Write a viral short-form video script (TikTok/Reels/Shorts).
        Topic: ${topic}
        Target Language: ${language}
        Visual Style: ${style}
        Estimated Duration: ${duration} minutes.
        
        Structure:
        1. Hook (0-3s)
        2. The Problem/Pain Point
        3. The Psychology/Solution
        4. CTA
        
        Use a "Criminal Mind" or "Dark Psychology" tone.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview', // Good for creative writing
            contents: prompt,
        });

        return response.text || "No script generated.";
    } catch (error: any) {
        throw new Error(error.message || "Failed to generate script.");
    }
};

export const generateSeoStrategy = async (apiKey: string, topic: string): Promise<string> => {
    try {
        const ai = getClient(apiKey);
        const prompt = `
        Analyze SEO for the topic: "${topic}" specifically for a "Dark Psychology" or "True Crime" niche channel.
        Return a JSON-like structure (but just clear text) with:
        - 5 High CTR Titles
        - 10 Viral Tags
        - Description opening with keywords
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text || "No SEO data generated.";
    } catch (error: any) {
        throw new Error(error.message || "Failed to generate SEO.");
    }
};

export const generateMarketFunnel = async (apiKey: string, topic: string): Promise<string> => {
    try {
        const ai = getClient(apiKey);
        const prompt = `
        Create a product funnel for the niche: "${topic}".
        1. Lead Magnet (Free)
        2. Tripwire Product ($7-$27)
        3. Core Offer ($97+)
        
        Explain the psychological trigger for each.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text || "No market data generated.";
    } catch (error: any) {
        throw new Error(error.message || "Failed to generate market funnel.");
    }
};

export const generateEvidenceImage = async (apiKey: string, prompt: string): Promise<string> => {
    try {
        const ai = getClient(apiKey);
        
        // Using gemini-2.5-flash-image for speed/demo purposes as requested in standard guidelines
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
            config: {
                // responseMimeType and responseSchema are NOT supported for this model
            }
        });

        // Extract image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        
        return "";
    } catch (error: any) {
        throw new Error(error.message || "Failed to generate image.");
    }
};
