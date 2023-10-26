import { errorHandler } from "../utils/error.js";
import * as userService from '../services/user.service.js';
import bcrypt from 'bcryptjs';

export const  test = (req, res) => {
    res.json({
        message: "Namaste Bharat!!"
    });
}

export const updateUser = async (req, res, next) => {
    
    try {
        if (req.user.id != req.params.id ) {
            throw errorHandler(403, "Unauthorized");
        }

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const data = {
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
            avatar: req.body.avatar
        };

        const updatedUser = await userService.updateUser(req.user.id, data);

        if (updatedUser) {
            res.status(200).json({
                success: true,
                message: "User Updated successfully!!",
                user: updatedUser
            });
        } else {
            throw errorHandler(500, 'Unable to update User!!');
        }

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {

    try {
        if (req.user.id != req.params.id) {
            throw errorHandler(403, 'Unauthorized User Access!!');
        }

        await userService.deleteUser(req.params.id);

        res.clearCookie('access_token');
        res.status(200).json({
            success: true,
            message: "User Removed Successfully!!"
        });

    } catch (error) {
        next(error);
    }
}