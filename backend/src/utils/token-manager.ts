//after completing usersignup and login we need to generate token for login as authentication
//User authentication: user needs to verify the identity  fo appplication
//user needs to provode email password created duirng registration process and then user will be provided token after auth process
//in simple when we join compny we get id card similarly after login will be getting token 
//will be using JWT token used to encrypt payload into a signed  token that has the permission of the user
//we need to send token to the user with help of HTTP only cookies 
//Http cookie that comes with special security that restricts from being accessed by JS in web browser this prevents XSS attacks

//User authentication -> sets  HTTP only signed cookie with JWT token -> User has Token
//access protected resources -> User sends back the cookies -> if the cookie matches and token is valid -> process request else not abort


import { Request, Response, NextFunction } from 'express';
import  jwt  from "jsonwebtoken";
import  { COOKIE_NAME } from "./constants.js";
import { promise } from "zod";
import { rejects } from "assert";



export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    //secreat Key is required for hasing to  sign the token or encrypt the token
    //secreat key is private key to encrypt
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //provide expires in
        expiresIn,
    });
    return token;
};


//verify token of the user

export const verifyToken = async (
    req:Request, 
    res:Response, 
    next: NextFunction) => {
        //sending cookies along with request
         let token = req.header("Authorization");
        // const token = req.signedCookies[`${COOKIE_NAME}`];

        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Token Not Received" });
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        console.log("Verifying token:", token.substring(0, 20) + "...");

        //now verify the token by just checking if that token has data is valid then will move on to next middleware
        //but if the token is not valid and we can abort the request and send response

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decoded);
            res.locals.jwtData = decoded;
            return next();
        } catch (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ message: "Token Expired or Invalid" });
        }
    };