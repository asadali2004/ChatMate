import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGroq } from '../config/groq-config.js';
import { config } from 'dotenv';


// Handles chat completion requests by sending user messages to Groq AI and saving responses
export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {message} = req.body;
    try {
    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res
    .status(401)
    .json({message:"User not registred OR Token malfunctioned"});
    const chats = user.chats.map(({ role, content }) => ({ 
        role,
        content,
      })) as any[];
      chats.push({ content: message, role: "user" });
      user.chats.push({ content: message, role: "user" });
    const groq = configureGroq();
    console.log("Sending request to Groq with", chats.length, "messages");
    const chatResponse = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: chats,
      max_tokens: 2000,
      temperature: 0.7,
    });
    console.log("Groq response received");
    if (chatResponse.choices && chatResponse.choices[0] && chatResponse.choices[0].message) {
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } else {
        return res.status(500).json({ message: "No response from Groq AI" });
    }
    } catch (error) {
        console.log("Chat completion error:", error);
        if (error.response) {
            console.log("Groq API Error:", error.response.data);
            return res.status(500).json({ 
                message: "Groq API Error", 
                error: error.response.data 
            });
        }
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message 
        });
    }
  };


// Returns all chat messages for the authenticated user
export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  

// Deletes all chat messages for the authenticated user
export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res
        .status(200)
        .json({ message: "OK"});
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  

// Enhances a user prompt using Groq AI for better clarity and effectiveness
export const enhancePrompt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { prompt } = req.body;
      if (!prompt || prompt.trim() === "") {
        return res.status(400).json({ message: "Prompt is required" });
      }
      const groq = configureGroq();
      console.log("Enhancing prompt:", prompt);
      const enhancementResponse = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a prompt enhancement assistant. Your job is to rewrite user prompts to make them clearer, more specific, and more effective for AI interactions. Keep the original intent but improve clarity, structure, and specificity. Return only the enhanced prompt without any explanations."
          },
          {
            role: "user",
            content: `Enhance this prompt for better AI interaction: ${prompt}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });
      if (enhancementResponse.choices && enhancementResponse.choices[0] && enhancementResponse.choices[0].message) {
        let enhancedPrompt = enhancementResponse.choices[0].message.content.trim();
        if ((enhancedPrompt.startsWith('"') && enhancedPrompt.endsWith('"')) ||
            (enhancedPrompt.startsWith("'") && enhancedPrompt.endsWith("'"))) {
          enhancedPrompt = enhancedPrompt.slice(1, -1);
        }
        return res.status(200).json({ enhancedPrompt });
      } else {
        return res.status(500).json({ message: "No response from AI for prompt enhancement" });
      }
    } catch (error) {
      console.log("Prompt enhancement error:", error);
      if (error.response) {
        console.log("Groq API Error:", error.response.data);
        return res.status(500).json({ 
          message: "AI Enhancement Error", 
          error: error.response.data 
        });
      }
      return res.status(500).json({ 
        message: "Something went wrong with prompt enhancement", 
        error: error.message 
      });
    }
  };
