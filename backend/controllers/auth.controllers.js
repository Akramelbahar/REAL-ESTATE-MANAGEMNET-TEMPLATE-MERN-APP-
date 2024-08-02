import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username.toLowerCase() });
        
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
        return res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signup = async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            username,
            email,
            password,
            confirmPassword,
            tel,
            role,
            gender,
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(409).send({ message: "Passwords don't match!" });
        }
        
        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists!" });
        }

        if (!(["agent", "user"].includes(role))) {
            return res.status(409).json({ message: "Invalid account type" });
        }

        const profilePicUrl = gender === 'female' 
            ? `https://avatar.iran.liara.run/public/girl?username=${username}`
            : `https://avatar.iran.liara.run/public/boy?username=${username}`;
        
        const newUser = new User({
            FirstName,
            LastName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,  // storing the plain text password
            tel: tel || "",
            role,
            gender: gender || 'none',
            profile_pic: profilePicUrl
        });

        await newUser.save();

        const token = generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            user: newUser,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
