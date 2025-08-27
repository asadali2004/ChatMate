import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator, promptEnhanceValidator } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser, enhancePrompt } from "../controllers/chat-controllers.js";


//Protected API
const chatRoutes = Router();
{/* /api/chat/new  */}
chatRoutes.post(
    "/new", 
    verifyToken,
    validate(chatCompletionValidator), 
    generateChatCompletion
); 

chatRoutes.get(
    "/all-chats", 
    verifyToken,
    sendChatsToUser
); 

chatRoutes.delete(
    "/delete", 
    verifyToken,
    deleteChats
); 

//POST route for enhancing prompts
chatRoutes.post(
    "/enhance-prompt",
    verifyToken,
    validate(promptEnhanceValidator),
    enhancePrompt
);

export default chatRoutes;