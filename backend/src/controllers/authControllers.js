// backend/src/controllers/authControllers.js

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
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