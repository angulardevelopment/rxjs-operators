import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai"; // @genkit-ai/googleai @genkit-ai/vertexai older packages to remove

const ai = genkit({
  plugins: [googleAI()], 
});

async function testConnection() {
  try {
    console.log("Connecting to Gemini...");
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: 'Say "Connection successful!" if you receive this.',
    });
    console.log("Response:", text);
  } catch (error) {
    console.error("🔥 Error Details:", error);
  }
}
