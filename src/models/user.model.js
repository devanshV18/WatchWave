import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: TRUE,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index:true
    },

    avatar: {
        type: String, //cloudinary url - free
        required: true,
    },

    coverImage: {
        type:String
    },

    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],

    password:{
        type: String,
        required:[true,'Password is required']  //true and a default message for password field in DB
    },

    refreshToken:{
        type : String,
        }

    },

    {
        timestamps: true  //gives created at and updated at
    }
)


//PAssword ENcryption - while creating or updating password
userSchema.pre("save",async function (next) {
   if(! this.isModified("password")) return
   this.password = bcrypt.hash(this.password,10)
   next()
})


//custom methods 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)   //returns boolean
}

export const User = mongoose.model("User",userSchema)