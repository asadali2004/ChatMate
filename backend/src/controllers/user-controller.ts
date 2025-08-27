import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { COOKIE_URL } from "../utils/constants.js";

// Retrieves all users from the database
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Creates a new user account with hashed password and returns JWT token
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Signup attempt:", { body: req.body });
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(409).json({ message: "User already registered", email });
    }
    
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    console.log("User created successfully:", email);

    const token = createToken(user._id.toString(), user.email, "7d");

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email, token });
  } catch (error) {
    console.log("Signup error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// Authenticates user credentials and returns JWT token on successful login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    const token = createToken(user._id.toString(), user.email, "7d");

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// Validates JWT token and returns user information if token is valid
export const verifyUser = async (
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
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
