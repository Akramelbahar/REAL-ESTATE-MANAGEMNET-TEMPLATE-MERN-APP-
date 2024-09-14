import express from "express";
import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
export const getUserConversationsWithLastMessage = async (req, res) => {
  try {
      const loggedInUser = req.user._id;
      
      const conversations = await Conversation.find({ participants: loggedInUser })
          .sort({ updatedAt: -1 }) 
          .populate({
              path: 'messages',
              options: {
                  sort: { 'createdAt': -1 },
                  limit: 1 
              }
          })
          .populate({
              path: 'participants',
              select: ' username profile_pic',
          }).limit(10);

      const userConversations = conversations.map(conversation => {
          const lastMessage = conversation.messages[0];
          const otherParticipant = conversation.participants.find(participant => participant._id.toString() !== loggedInUser.toString());
          return {
              conversationId: conversation._id,
              otherParticipant,
              lastMessage,
          };
      });

      res.status(200).json(

          userConversations
        );
  } catch (error) {
      res.status(500).json({
          message: "Error in getUserConversationsWithLastMessage: " + error.message
      });
  }
};

export const userRole = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const user = await User.findById(loggedInUser);
      if (!user) return res.status(400).json({ message: "User Not Found" });
      res.status(200).json(user.role);
    } catch (error) {
      res.status(500).json({ message: "Error in userRole: " + error.message });
    }
  };

export const userRoleChanger = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const { newRole } = req.body;
      const user = await User.findById(loggedInUser);
  
      if (!user) return res.status(400).json({ message: "User Not Found" });
      if ((newRole === "user") && (user.ads.length > 0)) {
        return res.status(400).json({ message: "Vous avez deja des Advertisment actif" });
      }
  
      if (user.role !== newRole) {
        user.role = newRole;
        await user.save(); 
        return res.status(200).json({ message: "User role updated successfully" });
      } else {
        return res.status(200).json({ message: "No change in user role" });
      }
  
    } catch (error) {
      res.status(500).json({ message: "Error in userRoleChange: " + error.message });
    }
  };
  export const userInfo = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const user = await User.findById(loggedInUser);
      if (!user) return res.status(400).json({ message: "User Not Found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error in userRole: " + error.message });
    }
  };

  export const userInfoEdit = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const user = await User.findById(loggedInUser);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const {
        FirstName,
        LastName,
        username,
        email,
        password,
        newPassword,
        confirmPassword,
        tel,
        role,
        gender,
        profile_pic,
      } = req.body;
  
      if (password !== user.password) {
        return res.status(409).json({ message: "Current password is incorrect" });
      }
  
      if (newPassword && newPassword !== confirmPassword) {
        return res.status(409).json({ message: "New passwords don't match" });
      }
  
      if (newPassword) {
        user.password = newPassword;
      }
  
      if (user.ads.length > 0 && role === "user") {
        return res.status(409).json({ message: "You can't change role due to existing ads" });
      }
  
      user.FirstName = FirstName || user.FirstName;
      user.LastName = LastName || user.LastName;
      user.username = username || user.username;
      user.email = email || user.email;
      user.tel = tel || user.tel;
      user.role = role || user.role;
      user.gender = gender || user.gender;
  
      if (profile_pic) {
        user.profile_pic = profile_pic;
      } else {
        const male_avatar = 'https://avatar.iran.liara.run/public/boy?username=' + user.username;
        const female_avatar = 'https://avatar.iran.liara.run/public/girl?username=' + user.username;
        user.profile_pic = gender === "male" ? male_avatar : female_avatar;
      }
  
      if (!(["agent", "user"].includes(user.role))) {
        return res.status(409).json({ message: "Account type invalid" });
      }
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };
export const userFavSeen = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const user = await User.findById(loggedInUser);
      if (!user) return res.status(400).json({ message: "User Not Found" });
  
      await user.populate("favorite");
      await user.populate("seen");
  
      res.status(200).json({
        favorite: user.favorite ,
        seen: user.seen
      });
    } catch (error) {
      res.status(500).json({ message: "Error in userFavSeen: " + error.message });
    }
  };
  