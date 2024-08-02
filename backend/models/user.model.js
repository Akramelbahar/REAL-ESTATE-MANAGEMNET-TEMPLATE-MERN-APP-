import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    tel: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "agent", "admin"],
        required: true,
        default: "user",
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female","none"],
    },
    profile_pic: {
        type: String,
        required: false,
        default: ""
    },
    ads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertisment",
        default: []
    }],
    seen : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertisment",
        default: []
    }]
    ,
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertisment",
        default: []
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
