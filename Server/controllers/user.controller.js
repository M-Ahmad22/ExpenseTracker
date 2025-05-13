import User from "../models/user.model.js";
import { UserServices } from "../services/user.services.js";
import { validationResult } from "express-validator";
import BlackListToken from "../models/blackListToken.model.js";

const registerUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { name, email, password, role } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await User.hashPassword(password);
    const user = await UserServices.createUser(name, email, hashedPassword, role);
    const token = user.generateToken();
    
    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(201).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Internal server error" 
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = user.generateToken();
    
    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(200).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Internal server error" 
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    await BlackListToken.create({ token });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Internal server error" 
    });
  }
};

export const UserController = {
  registerUser,
  loginUser,
  logoutUser,
};
