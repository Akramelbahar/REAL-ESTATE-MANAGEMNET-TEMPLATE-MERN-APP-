import express from "express";
import { sendMessage , getMessages} from "../controllers/message.controllers.js";
import protectRoute from "../utils/middleware/protectroute.js";

const router = express.Router();

router.post("/send/:receiverId",protectRoute,sendMessage);
router.get("/:receiverId", protectRoute,getMessages);

export default router ;