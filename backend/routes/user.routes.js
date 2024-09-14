import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import {  getUserConversationsWithLastMessage, userFavSeen, userInfo, userInfoEdit, userRole, userRoleChanger } from "../controllers/user.controllers.js";
import { searchByUserName } from "../controllers/message.controllers.js";
const router = express.Router();
router.get("/conversation",protectRoute,getUserConversationsWithLastMessage);
router.get("/role" , protectRoute, userRole);
router.put("/role" , protectRoute , userRoleChanger);
router.get("/",protectRoute,userInfo)
router.put("/",protectRoute,userInfoEdit)
router.get("/userfavseen" , protectRoute ,userFavSeen )
router.post("/searchUsername",protectRoute,searchByUserName)
export default router ;