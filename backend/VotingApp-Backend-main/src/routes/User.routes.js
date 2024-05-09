import { Router } from "express";
import { changeCurrentPassword, getCurrentUser,isVotedToggle, login, logout, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRoutes = Router()

userRoutes.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

userRoutes.route("/login").post(login)
userRoutes.route("/isvoted/:candidateUserName").post(verifyJWT,isVotedToggle)
// userRoutes.route("/toggle/t/:tweetId").post(toggleTweetLike);
userRoutes.route("/logout").post(verifyJWT, logout)
// userRoutes.route("/refresh-token").post(refreshAccessToken)
// userRoutes.route("/update-password").post(verifyJWT, changeCurrentPassword)
userRoutes.route("/getCurrentUser").get(verifyJWT, getCurrentUser)
// userRoutes.route("/updateAccountDetails").patch(verifyJWT, updateAccountDetails);
// userRoutes.route("/updateUserAvatar").patch(verifyJWT,
//     upload.single("avatar"),
//     updateUserAvatar);
// userRoutes.route("/updateUserCoverImage").patch(verifyJWT,
//     upload.single("coverImage"),
//     updateUserCoverImage)

export default userRoutes