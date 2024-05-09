import { Contestant } from "../models/contestant.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinaryFileUpload.js"

const registerContestant = asyncHandler(async (req, res) => {
    // S-1 Get user data from frontend
    // S-2 Validations like not null, email correct
    // S-3 Check if already registered : username, email
    // S-4 Check for images, Check for avatar
    // S-5 If images then upload to cloudinary 
    // S-6 Create User object - create entry in db
    // S-7 Remove password and refresh token field from response
    // S-8 Check for user-creation
    // S-9 Return response

    console.log("Req. Body", req.body);
    // S-1
    const { username, fullName, email, party, votecount } = req.body;

    //S-2
    // if (fullName === "") {
    //     throw new ApiError(400, "FullName is required")
    // }
    // console.log("Enteryuvihddbcdb" ,req.files.avatar)
    if (!username || !fullName || !email || !party || !votecount) {
        throw new ApiError(400, "All fields are required");
    }

    //S-3
    const existedUser = await Contestant.findOne({
        $or: [{ username }, { email }, {party}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //S-4
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files?.avatar[0]?.path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file local-path is required")
    }

    // S-5
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // S-6
    // only user is directly talking with database
    const user = await Contestant.create({
        username,
        username: username.toLowerCase(),
        fullName,
        email,
        party,
        votecount,
        avatar: avatar.url,
    })

    // S-7
    const createdUser = await Contestant.findById(user._id)

    // S-8
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }
    // S-9
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User Registered successfully")
    )
}
)


const getAllContestant = asyncHandler(async (req, res) => {
    const user = await Contestant.find()
    return res
        .status(200)
        .json(
            new ApiResponse(200,
                user,
                "Current user accessed successfully")
        )
})


export {
    registerContestant,
    getAllContestant
}