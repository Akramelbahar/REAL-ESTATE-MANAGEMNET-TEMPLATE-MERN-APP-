import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import { getAdById, getAds, searchAds } from "../controllers/ads.controller.js"

const router = express.Router();

// Define the route with protection and controller function
router.get("", getAds);
router.get("/search" ,searchAds)
router.get("/:advertismentId" ,getAdById);
export default router;
