import { saveUser } from "../services/auth.service.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    let response = null;
    let statusCode = 500;

    const {name, phone, email, password} = req.body;

    try {
        const hashedPassword  = bcryptjs.hashSync(password, 10);
        const user = await saveUser({name, phone, email, password: hashedPassword});
    
        if (user != null) {
            statusCode = 201;
            response = {
                message : "User Created Successfully!!",
                user: user
            };
        } else {
            response = {
                message : "Failed to create User!!"
            };
        }
    } catch (error) {
        response = {
            message: error.message
        };
    }

    res.status(statusCode).json(response);
}