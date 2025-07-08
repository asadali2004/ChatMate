import { Configuration } from "openai";

export const configureOpenAI = () => {
  if (!process.env.OPENAI_API_KEYSET) {
    throw new Error("OpenAI API key not found in environment variables");
  }
  
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEYSET,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return config;
};