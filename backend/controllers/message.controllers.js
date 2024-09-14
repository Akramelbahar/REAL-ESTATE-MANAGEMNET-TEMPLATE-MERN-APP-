import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.receiverId;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            messageBody: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json({
            conversation,
            message: newMessage,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.receiverId;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })
            .populate("messages").populate({
                "path" : "participants" , 
                "select" : "username profile_pic",
                options: {
                    sort: { 'createdAt': -1 },
                    limit: 50 
                }
            }).limit(50);
        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] }); 
            return res.status(200).json({ message: [] });
        }
        res.status(200).json(
            conversation
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const searchByUserName = async (req, res) => {
    try {
        const { username } = req.body;
        console.log(username)
        const users = await User.find({ username })
            .select("username profile_pic")
            .limit(1);
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};