import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllContestant, registerContestant } from "../controllers/contestant.controller.js";

const contestantRoutes = Router()

contestantRoutes.route("/register").post(
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
    registerContestant
)

contestantRoutes.route("/getcontestant").get(getAllContestant)
// userRoutes.route("/login").post(login)
// userRoutes.route("/logout").post(verifyJWT, logout)
// userRoutes.route("/refresh-token").post(refreshAccessToken)
// userRoutes.route("/update-password").post(verifyJWT, changeCurrentPassword)
// userRoutes.route("/getCurrentUser").get(verifyJWT, getCurrentUser)
// userRoutes.route("/updateAccountDetails").patch(verifyJWT, updateAccountDetails);
// userRoutes.route("/updateUserAvatar").patch(verifyJWT,
//     upload.single("avatar"),
//     updateUserAvatar);
// userRoutes.route("/updateUserCoverImage").patch(verifyJWT,
//     upload.single("coverImage"),
//     updateUserCoverImage)

export default contestantRoutes