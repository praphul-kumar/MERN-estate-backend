import * as userService from "../services/user.service.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res, next) => {
    const {name, phone, email, password} = req.body;

    try {
        
        const hashedPassword  = bcryptjs.hashSync(password, 10);
        const user = await userService.saveUser({name, phone, email, password: hashedPassword});
    
        if (user != null) {
            const {password: pass, ...userWithoutPass} = user._doc;
            
            res.status(201).json({
                success: true,
                message : "User Created Successfully!!",
                user: userWithoutPass
            });
        } else {
            throw errorHandler(500, "Failed to create User on Server");
        }
    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await userService.findOneWithEmail(email);
    
        if (user != null) {
            if (bcryptjs.compareSync(password, user.password)) {
                const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

                const {password: pass, ...userWithoutPass} = user._doc;

                res.cookie('access_token', access_token, { httpOnly: true })
                .status(201).json({
                    success: true,
                    message : "Login Successfully!!",
                    user: userWithoutPass
                });

            } else {
                throw errorHandler(401, "Invalid User Credential!!");
            }
        } else {
            throw errorHandler(404, "User Not Found!!");
        }
        
    } catch (error) {
        next(error);
    }
}

export const googleSignIn = async (req, res, next) => {
    
    const {name, email, phone, photo} = req.body;

    try {
        const user = await userService.findOneWithEmail(email);

        if (user) {
            const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            const {password: pass, ...userWithoutPass} = user._doc;

            res.cookie('access_token', access_token, {httpOnly: true}).status(201).json({
                success: true,
                message : "Login Successfully!!",
                user: userWithoutPass
            });

        } else {
            // Create new User
            const generatedPassword = Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            
            const user = await userService.saveUser({name, phone, email, password: hashedPassword, photo});
        
            if (user != null) {
                const {password: pass, ...userWithoutPass} = user._doc;
                
                res.status(201).json({
                    success: true,
                    message : "User Created Successfully!!",
                    user: userWithoutPass
                });
            } else {
                throw errorHandler(500, "Failed to create User on Server");
            }
        }
    } catch (error) {
        next(error);
    }
}