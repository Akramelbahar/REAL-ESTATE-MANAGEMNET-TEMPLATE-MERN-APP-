import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import { getAdById, getAds, totalPages , searchAds } from "../controllers/ads.controller.js"

const router = express.Router();

router.get("", getAds);
router.get("/search" ,searchAds)
router.get("/:advertismentId" ,getAdById);
router.get("/pageCount" , totalPages);
export default router;
