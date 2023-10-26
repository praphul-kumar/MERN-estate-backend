import User from "../models/user.model.js";

export const saveUser = async (user) => {
  try {
    let result = null;
    if (user instanceof User) {
      result = await user.save();
    } else {
      result = await new User(user).save();
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          phone: data.phone,
          password: data.password,
          avatar: data.avatar,
        },
      },
      { new: true }
    );

    const {password, ...userWithoutPass} = updatedUser._doc;

    return userWithoutPass;

  } catch (error) {
    throw error;
  }
};

export const findOneWithEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};
