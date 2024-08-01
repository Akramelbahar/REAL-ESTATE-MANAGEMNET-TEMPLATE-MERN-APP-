import express from "express";
import {getUserAds,  getAdInfo,editPost,createAd , deletePost, addFav} from "../controllers/advertisment.controllers.js";
import protectRoute from "../utils/middleware/protectroute.js";

const router = express.Router();

router.get("/:advertismentId", protectRoute, getAdInfo);
router.post("/",protectRoute,createAd);
router.put("/",protectRoute,editPost);
router.delete("/:advertismentId",protectRoute,deletePost);
router.get("/",protectRoute,getUserAds)
router.get("/favorite/:advertismentId",protectRoute,addFav)
export default router;
