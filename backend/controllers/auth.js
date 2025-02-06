import express from "express";
import UserModel from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const Register = async (req, res) => {
 try {
   const {username, email, password} = req.body;

   if(!username || !email || !password){
     return res.status(400).json({success: false, message: "Please fill all the fields"});
   }
   const existingUser = await UserModel.findOne({email});
   if(existingUser){
      return res.status(400).json({success:false,message: "User already exists Please login"});
   }

   const hashedPassword = await bcrypt.hashSync(password, 10);
   const NewUser = new UserModel({username, email, password: hashedPassword});
   await NewUser.save();
   res.status(200).json({ success : true, message: "User registered successfully", data: NewUser});
 


} catch (error) {
   console.log(error);
   return res.status(500).json({message: "Internal server error"});
 }

}

const Login = async (req, res) => { 
   try {
      const {email, password} = req.body;
      if(!email || !password){
         return res.status(400).json({success: false, message: "Please fill all the fields"});
      }
      const existingUser = await UserModel.findOne({email});
      if(!existingUser){
         return res.status(400).json({success:false,message: "User does not exist Please register"});
      }
   
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if(!isPasswordCorrect){
         return res.status(400).json({success:false,message: "Invalid credentials"});
      }
      
      const token = await jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})
      res.cookie("token", token, {httpOnly: true,maxAge: 1000*60*60*24*3});
      
      res.status(200).json({success:true, message: "User logged in successfully"})
   
      
   
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal server error"});
   }

}

const Logout = async (req, res) => {
   try{
      res.clearCookie("token");
      res.status(200).json({success:true, message: "User logged out successfully"});

   }catch(error){
      console.log(error);
      return res.status(500).json({message: "Internal server error"});
   }

}

export {Register,Login,Logout};

