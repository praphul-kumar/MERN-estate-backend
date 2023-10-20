import { findOneWithEmail, saveUser } from "../services/auth.service.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
    const {name, phone, email, password} = req.body;

    try {
        const hashedPassword  = bcryptjs.hashSync(password, 10);
        const user = await saveUser({name, phone, email, password: hashedPassword});
    
        if (user != null) {
            res.status(201).json({
                success: true,
                message : "User Created Successfully!!",
                user: user
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
        const user = await findOneWithEmail(email);
    
        if (user != null) {
            if (bcryptjs.compareSync(password, user.password)) {
                console.log('Login Success!!');
                res.status(201).json({
                    success: true,
                    message : "Login Successfully!!",
                    user: user
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