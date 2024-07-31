import {Router} from "express";
import advertiserCreation from "../controller/advertiserCreation.js";
const router = Router();

router.post("/addAdvertiser", advertiserCreation);

export default router