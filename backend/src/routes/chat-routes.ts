import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";


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





    

export default chatRoutes;