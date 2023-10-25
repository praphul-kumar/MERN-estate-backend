import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        length: 10,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    photo: {
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocJU2UN3kHiH4C9MqLN3qqEWYXredBOV_7_-a_KAcX3w=s96-c"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;