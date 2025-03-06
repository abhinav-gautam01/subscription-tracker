import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js';


export const signUp = async (req, res, next)=>{
    console.log('inside Sign-up');

    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        console.log(req.body);
        const {name, email, password } = req.body;
        console.log({name,email,password});

        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exist');
            error.statusCode= 409;
            throw error;
        }

        // ?hashing a password using bycrypt;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create([{name, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'user created succesfully',
            data: {
                token,
                user: newUser[0]
            }
        });

    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }


};
export const signIn = async (req, res, next)=>{
    try{
        const {email,password}= req.body;
        
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode= 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message: 'user signed succesfully',
            data:{
                token,
                user
            }
        });



    }
    catch(error){
        next(error);
    }
};
export const signOut = async (req, res, next)=>{

};

