import { Router } from "express";
import { postImageDetails } from "../controllers/processedImage.controller.js";

const router = Router();


router.route("/post-image-details").post(postImageDetails);



export default router;