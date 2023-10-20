import User from "../models/user.model.js"

export const saveUser = async (user) => {
    try {
        let result = null;
        if (user instanceof User) {
            result = await user.save()
        } else {
            result = await new User(user).save();
        }

        return result;

    } catch(error) {
        throw error;
    }
}

export const findOneWithEmail = async (email) => {
    try {
        return await User.findOne({email});

    } catch(error) {
        throw error;
    }
}