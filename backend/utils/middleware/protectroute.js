import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt ? req.cookies.jwt : req.headers.token;        
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute:", error);
        res.status(500).json({ error: error.message });
    }
};

export default protectRoute;
