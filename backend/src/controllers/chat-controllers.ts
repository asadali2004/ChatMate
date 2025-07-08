import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGroq } from '../config/groq-config.js';
import { config } from 'dotenv';


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //we want message from the user so from body will be accessing message from body
    const {message} = req.body;
    try {
        //now we have message and we need to add validation
    //verify the details of the user

    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res
    .status(401)
    .json({message:"User not registred OR Token malfunctioned"});


    //grab chat of the User blow =>{/**This is the static message of the chat */}
    const chats = user.chats.map(({ role, content }) => ({ 
        role,
        content,
      })) as any[];
      chats.push({ content: message, role: "user" }); {/* push the chats or send the chat from the user */}
      user.chats.push({ content: message, role: "user" }); {/**So we need to store chats in main user objects */}
      //above all will grab the chats of the user     
  
    



    //Send all chats with new one to Groq API
    const groq = configureGroq();
    
    console.log("Sending request to Groq with", chats.length, "messages");
    
    // get latest response from Groq
    const chatResponse = await groq.chat.completions.create({
      model: "llama3-8b-8192", // Fast and free Llama 3 model
      messages: chats,
      max_tokens: 1000,
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



  export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
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
  

  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
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
  