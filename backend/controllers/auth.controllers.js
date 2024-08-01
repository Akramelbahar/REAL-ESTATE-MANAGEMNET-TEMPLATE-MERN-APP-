import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const login = async (req,res)=>{
   try {
        const {username,password} = req.body ;
        const user = await User.findOne({username});
        if(!user || (user.password != password))return res.status(400).json({message:"Invalid username or password ."});

        res.status(200).json({
            user , 
            token :generateTokenAndSetCookie(user._id,res)
        })



   } catch (error) {
    res.status(404).json({message:error.message});
   }
}

export const logout = (req , res)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        return res.status(200).send("Log out successfully");
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const  signup = async (req , res)=>{
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
            
        }= req.body; 
        console.log(req.body)
        if(password!=confirmPassword)return res.status(409).send({message:"Password don't match !"});
        const user = await User.findOne({username});
        if (!(["agent","user"].includes(role)))return res.status(409).send({message:"Account Type Invalid"});
        if(user)return res.send({message:"error username exist already ! "}).status(409);
        const male_avatar = 'https://avatar.iran.liara.run/public/boy?username='+username;
        const female_avatar = 'https://avatar.iran.liara.run/public/girl?username='+username;
        const newUser = new User({
            FirstName:FirstName ,
            LastName:LastName,
            username:username,
            email:email,
            password:password,
            tel : tel ?tel : "",
            role,
            gender:gender? gender : 'none',
            profile_pic:male_avatar

        })
        if (newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            
            res.status(201).json({
            user : newUser,
            token : generateTokenAndSetCookie(newUser._id,res)
            });
        }
        else {
            return res.status(400).json({message:"New User Error ; "});
        }

    } catch (error) {
        res.send({"error":error.message})
    }
}
