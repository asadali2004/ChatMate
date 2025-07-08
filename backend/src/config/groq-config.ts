import Groq from "groq-sdk";

export const configureGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Groq API key not found in environment variables");
  }
  
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  
  return groq;
};
