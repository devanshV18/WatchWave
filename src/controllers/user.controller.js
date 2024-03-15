import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"  //proxy user and model

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
    console.log("email: ", email);

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

    const existedUser = User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username alrteady exists")
    }



})

export {registerUser}