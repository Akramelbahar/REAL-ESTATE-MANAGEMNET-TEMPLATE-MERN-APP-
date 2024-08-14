import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import { getAdById, getAds, totalPages , searchAds } from "../controllers/ads.controller.js"

const router = express.Router();

router.get("", getAds);
router.get("/search" ,searchAds);
router.get("/pageCount" , totalPages);
router.get("/:advertismentId" ,getAdById);
export default router;
