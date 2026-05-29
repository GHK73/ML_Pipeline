// backend/src/controllers/authControllers.js

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
    );

// Normal signup
export const signup = async(req,res) =>{
    try{
        const{name, email, password} = req.body;

        if(!name|| !email|| !password){
            return res.status(400).json({message:"All fields are required",});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email,},
        });

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user =  await prisma.user.create({
            data:{name,email, password: hashPassword, provider: "local",},
        });

        const token = generateToken(user.id);
        res.status(201).json({
            message: "Signup Successful",
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                provider: user.provider,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

// GOOGLE SIGNUP/LOGIN
export const googleSignup = async(req,res) =>{
    try{
        const {token} = req.body;
        if(!token){
            return res.status(400).json({message: "Google token is missing"});
        }
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const{sub, email, name, picture} = payload;

        let user = await prisma.user.findUnique({
            where: {email},
        });
        
        if(!user){
            user = await prisma.user.create({
                data:{
                    name, email, googleId: sub, profilePic: picture, provider: "google"
                },
            });
        }
        const jwtToken = generateToken(user.id);
        res.status(200).json({
            message: "Google login Successful",
            token: jwtToken,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                provider: user.provider
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Google Authentication Failed"});
    }
};

// Signin
export const signin = async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Email and Password are required"});
        }

        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        if(user.provider !== "local"){
            return res.status(400).json({message: "Please login using ${user.provider}"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message:"Signin Successful",
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                provider: user.provider
            },
        });

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getCurrentUser = async(req, res)=>{
    try{
        console.log(req.userId);
        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select:{
                id:true,
                name: true,
                email: true,
                provider: true
            }
        });

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal Server error"
        });
    }
};