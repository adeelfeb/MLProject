import { Router } from "express";
import { registerUser, loginWithTempToken, loginUser, logoutUser,  refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, 
    updateUserAvatar, updateUserCoverImage, uploadFile } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js"; // Your multer setup
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getImageHistory, getImageDetails } from "../controllers/userImages.controller.js";

const router = Router();

// Existing routes
router.route("/register").post(upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/login-with-temp-token").post(loginWithTempToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);


router.route("/upload-file").post(verifyJWT, upload.single("file"), uploadFile);
router.route("/get-image-history").post(verifyJWT,getImageHistory);
router.route("/get-image-details").post(verifyJWT,getImageDetails);

export default router;


