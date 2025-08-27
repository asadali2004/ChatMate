import { Request, Response, NextFunction } from 'express';
import  jwt  from "jsonwebtoken";
import  { COOKIE_NAME } from "./constants.js";
import { promise } from "zod";
import { rejects } from "assert";

// Creates a JWT token with user ID, email and expiration time
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};


// Middleware to verify JWT token from Authorization header and authenticate user
export const verifyToken = async (
    req:Request, 
    res:Response, 
    next: NextFunction) => {
        let token = req.header("Authorization");

        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Token Not Received" });
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        console.log("Verifying token:", token.substring(0, 20) + "...");

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