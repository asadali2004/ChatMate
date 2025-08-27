import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { body } from "express-validator";

// Middleware to run validation chains and handle errors
export const validate = (validations: ValidationChain[]) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req); 
        if(errors.isEmpty()) {
            return next();
        }
        console.log("Validation Errors:", errors.array());
        return res.status(422).json({ errors: errors.array() });
    };
};

// Validation rules for login requests
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast  6 characters"),
];

// Validation rules for signup requests
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

// Validation rules for chat completion requests
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];

// Validation rules for prompt enhancement requests
export const promptEnhanceValidator = [
    body("prompt").notEmpty().withMessage("Prompt is required"),
];
