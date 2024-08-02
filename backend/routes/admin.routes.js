import express from "express";
import protectRoute from "../utils/middleware/protectroute.js";
import { getUsersByAdmin ,getUserInfo, createUser, DeleteUser, editUser, getAdvertismentsByAdmin, getAdvertismentByAdmin, deleteAd, getStatistics, calculateChangeRate } from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/users",protectRoute,getUsersByAdmin ); 
router.get("/user/:userId",protectRoute,getUserInfo) 
router.post("/user/",protectRoute,createUser);
router.delete("/user/:userId",protectRoute,DeleteUser);
router.put("/user/:userId",protectRoute,editUser);

router.get("/advertisments",protectRoute,getAdvertismentsByAdmin);
router.get("/advertisment/:idAd",protectRoute,getAdvertismentByAdmin);
router.delete("/advertisment/:idAd",protectRoute,deleteAd)

router.get('/stats/:period', protectRoute,async (req, res) => {
    const period = req.params.period;
    const currentDate = new Date();
    let startDate, previousStartDate, previousEndDate;

    switch (period) {
        case 'today':
            startDate = new Date();
            startDate.setDate(currentDate.getDate());
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 1);
            previousEndDate = new Date(startDate);
            break;
        case 'last-3-days':
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 3);
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 3);
            previousEndDate = new Date(startDate);
            break;
        case 'last-7-days':
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 7);
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 7);
            previousEndDate = new Date(startDate);
            break;
        case 'last-30-days':
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 30);
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 30);
            previousEndDate = new Date(startDate);
            break;
        case 'last-365-days':
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 365);
            previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 365);
            previousEndDate = new Date(startDate);
            break;
        default:
            return res.status(400).json({ error: 'Invalid period' });
    }

    const currentStats = await getStatistics(startDate, currentDate);
    const previousStats = await getStatistics(previousStartDate, previousEndDate);

    const changeRates = {
        usersChangeRate: calculateChangeRate(currentStats.usersCount, previousStats.usersCount),
        adsChangeRate: calculateChangeRate(currentStats.adsCount, previousStats.adsCount),
        seenChangeRate: calculateChangeRate(currentStats.seenCount, previousStats.seenCount),
    };

    res.json({
        ...currentStats,
        ...changeRates
    });
});
export default router ;
