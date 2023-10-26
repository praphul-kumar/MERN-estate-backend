import { errorHandler } from "../utils/error.js";
import * as userService from '../services/user.service.js';
import bcrypt from 'bcryptjs';

export const  test = (req, res) => {
    res.json({
        message: "Namaste Bharat!!"
    });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id ) {
        throw errorHandler(403, "Unauthorized");
    }

    try {
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