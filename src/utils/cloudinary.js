import {v2 as cloudinary} from "cloudinary"
import fs from "fs"  //node file system library - read write remove etc of files


          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudianry = async (localFilePath) => {
    try {
        if(!localFilePath) return null


        //upload the file on clpoudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })


        //file has been successfully uplaoded
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        //unlinkin file from our local server incase of file upload to cloud failed - good practice
        fs.unlinkSync(localFilePath)
        return null
    }

}


export {uploadOnCloudianry}
 