import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import { getUsersByAdmin ,getUserInfo, createUser, DeleteUser, editUser, getAdvertismentsByAdmin, getAdvertismentByAdmin, deleteAd } from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/users",protectRoute,getUsersByAdmin ); 
router.get("/user/:userId",protectRoute,getUserInfo) 
router.post("/user/",protectRoute,createUser);
router.delete("/user/:userId",protectRoute,DeleteUser);
router.put("/user/:userId",protectRoute,editUser);

router.get("/advertisments",protectRoute,getAdvertismentsByAdmin);
router.get("/advertisment/:idAd",protectRoute,getAdvertismentByAdmin);
router.delete("/advertisment/:idAd",protectRoute,deleteAd)
export default router ;