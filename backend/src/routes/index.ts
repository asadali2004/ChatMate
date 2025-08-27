import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", userRouter); //domain/api/v1/user

//if the request is on chat then chatRoutes gona handle that 
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats


export default appRouter;