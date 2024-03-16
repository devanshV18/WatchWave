import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"  //proxy user and model
import { uploadOnCloudianry } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js" 

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend as per usermodel
    // validations for all details
    // check if user already exist : checking email and username can use any one too
    // check for images
    // upload images to cloudinary if images are available
    // create user Object - create an entry in db basicallyof thet created user
    // remove password and refresh token field from response
    // check for user creation is successful or not
    // return response


    //1

    const {fullname, email, username, password} = req.body
    // console.log("email: ", email);

    //2 - check for all if
    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // }

    //or

    if (
        [fullname,email,username,password].some((fields) => fields?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    //3

    const existedUser = await User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username alrteady exists")
    }

    //for deepdive
    // console.log(req.files)


    //4
    const avatarLocalPath =  req.files?.avatar[0]?.path;

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(401,"Avatar Local Path is missing")
    }

    //5
    const avatar =  await uploadOnCloudianry(avatarLocalPath)
    const coverImage =  await uploadOnCloudianry(coverImageLocalPath)

    

    if (!avatar) {
        throw new ApiError(400,"Avatar is required")
    }

    //6
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        username: username.toLowerCase(),
        email,
        coverImage: coverImage?.url || "",
        password,

    })

    //7
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //8

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    //9
     return res.status(201).json(
        new ApiResponse(200,createdUser, "User Registered Successfully")
     )

})

export {registerUser}