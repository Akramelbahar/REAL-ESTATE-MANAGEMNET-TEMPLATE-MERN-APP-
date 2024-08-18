import Advertisment from "../models/advertisment.model.js";
import Seen from "../models/log.model.js";
import User from "../models/user.model.js";


export const getUsersByAdmin = async (req, res) => {
    try {
        const adminId = req.user._id;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;

        if (!adminId) return res.status(400).json({ message: "Invalid account." });

        const user = await User.findById(adminId);

        if (!user || user.role !== "admin") return res.status(400).json({ message: "Invalid account." });

        const users = await User.find().sort({ date: 1 }).skip(20 * offset).limit(20).select("-gender -seen -favorite -createdAt -updatedAt");
        
        const modifiedUsers = users.map(user => {
            let userObj = user.toObject(); 
            userObj.ads = userObj.ads.length; 
            return userObj;
        });
        res.status(200).json(modifiedUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};


export const getUserInfo = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') return res.status(400).json({ message: 'Invalid account.' });

        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ message: 'Invalid request.' });

        const user = await User.findById(userId).populate('ads favorite');
        if (!user) return res.status(400).json({ message: 'User not found.' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user: ' + error.message });
    }
};


export const createUser = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await User.findById(adminId);

        if (!admin || admin.role !== 'admin') return res.status(400).json({ message: 'Invalid account.' });

        const {
            FirstName,
            LastName,
            username,
            email,
            password,
            confirmPassword,
            role = 'user',
            tel = '',
        } = req.body;

        const gender="none"
        if (!FirstName || !LastName || !username || !email || !password || !confirmPassword ) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });

        const existingUser = await User.findOne({ username });

        if (existingUser) return res.status(400).json({ message: 'Username already exists!' });

        const maleAvatar = 'https://avatar.iran.liara.run/public/boy?username=' + username;
        const femaleAvatar = 'https://avatar.iran.liara.run/public/girl?username=' + username;
        const newUser = new User({
            FirstName,
            LastName,
            username,
            email,
            password,
            tel,
            role,
            gender,
            profile_pic: maleAvatar
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user: ' + error.message });
    }
};

export const DeleteUser = async (req,res)=>{
    try {
        const adminId = req.user._id;
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') return res.status(400).json({ message: 'Invalid account.' });
        const userId = req.params.userId ;
        if (await User.findByIdAndDelete(userId)){
            res.status(202).json({
                message: "Deleted Successfully :)"
            });
        }
        else {
            res.status(400).json({
                message: "An error occured during deleting The User"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred during deleting the item: " + error.message
        });
    }
}



export const editUser = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await User.findById(adminId);

        if (!admin || admin.role !== 'admin') {
            return res.status(400).json({ message: 'Invalid account.' });
        }

        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const {
            FirstName,
            LastName,
            username,
            email,
            password,
            tel,
            role,
            gender,
            profile_pic,
            ads,
            favorite
        } = req.body;

        user.FirstName = FirstName ?? user.FirstName;
        user.LastName = LastName ?? user.LastName;
        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.password = password ?? user.password;
        user.tel = tel ?? user.tel;
        user.role = role ?? user.role;
        user.gender = gender ?? user.gender;
        user.profile_pic = profile_pic ?? user.profile_pic;

        if (ads) {
            user.ads = [...user.ads, ads];
        }

        if (favorite) {
            user.favorite = [...user.favorite, favorite];
        }

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getAdvertismentsByAdmin = async (req, res) => {
    try {
        const adminId = req.user._id;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const { sort, asc, desc } = req.query;

        if (!adminId) return res.status(400).json({ message: "Invalid account." });

        const user = await User.findById(adminId);
        if (!user || user.role !== "admin") return res.status(400).json({ message: "Invalid account." });

        let sortOrder = {};
        if (sort) {
            sortOrder[sort] = asc ? 1 : desc ? -1 : 1;
        } else {
            sortOrder = { date: 1 };
        }

        const ads = await Advertisment.find()
            .sort(sortOrder)
            .skip(20 * offset)
            .limit(20)
            .populate({ path: "createdBy", select: 'username' })
            .select("-equipment -diagnostic -pictures -description");

        const adsWithSeenCount = ads.map(ad => ({
            ...ad.toObject(),
            seen: ad.seen.length
        }));

        res.status(200).json(adsWithSeenCount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ads: " + error.message });
    }
};


export const getAdvertismentByAdmin = async (req, res) => {
    try {
        const adminId = req.user._id;
       
        if (!adminId) return res.status(400).json({ message: "Invalid account." });

        const user = await User.findById(adminId);

        if (!user || user.role !== "admin") return res.status(400).json({ message: "Invalid account." });
        if(!req.params.idAd)return res.status(400).json({
            error : "Invalid Ad Id"
        }) ; 
        const ad = await Advertisment.findById(req.params.idAd).populate("createdBy");
        if (!ad)return res.status(400).json({
            error : "Invalid Ad Id"
        });
        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ message: "Error fetching listing" });
    }
};
export const activateAd = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { enabled } = req.body;

        if (!adminId) {
            return res.status(400).json({ message: "Invalid account." });
        }

        const user = await User.findById(adminId);
        if (!user || user.role !== "admin") {
            return res.status(400).json({ message: "Invalid account." });
        }

        const adId = req.params.idAd;
        if (!adId) {
            return res.status(400).json({ error: "Invalid Ad ID." });
        }

        const ad = await Advertisment.findById(adId);
        if (!ad) {
            return res.status(400).json({ error: "Invalid Ad ID." });
        }

        ad.enabled = enabled === "true"; 
        await ad.save();

        res.status(200).json({ message: "Ad status updated successfully.", ad });
    } catch (error) {
        res.status(500).json({ message: "Error updating ad status.", error: error.message });
    }
};


export const deleteAd = async (req,res)=>{
    try {
        const adminId = req.user._id;
       
        if (!adminId) return res.status(400).json({ message: "Invalid account." });

        const user = await User.findById(adminId);

        if (!user || user.role !== "admin") return res.status(400).json({ message: "Invalid account." });
        if(!req.params.idAd)return res.status(400).json({
            error : "Invalid Ad Id"
        }) ; 
        const ad = await Advertisment.findByIdAndDelete(req.params.idAd).populate("createdBy");
        if (!ad)return res.status(400).json({
            error : "Invalid Ad Id"
        });
        res.status(200).json({deleted : ad});
    } catch (error) {
        res.status(500).json({ message: "Error fetching listing" });
    }
}

export const getStatistics = async (startDate, endDate) => {
    const usersCount = await User.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
    });

    const adsCount = await Advertisment.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
    });

    const seenCount = await Seen.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
    });

    return {
        usersCount,
        adsCount,
        seenCount
    };
};

export const calculateChangeRate = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
};
