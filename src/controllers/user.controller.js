import {asyncHandler} from "../utils/asyncHandler.js"

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

})

export {registerUser}