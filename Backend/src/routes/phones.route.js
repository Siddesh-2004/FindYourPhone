import { Router } from "express";
import { getPhoneRecommendations } from "../controllers/phoneRecommedation.controller.js";
const route=Router();

route.post("/getPhoneRecommendations", getPhoneRecommendations);

export default route;