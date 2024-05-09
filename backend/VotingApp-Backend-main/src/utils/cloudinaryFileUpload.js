import dotenv from "dotenv"
dotenv.config();

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
// fs(file system) helps to read, write, remove file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto", // Automatically detect type of file,
                folder: "Imaginary"
            })

        // File has been uploaded successfully
        // Now remove that file from local folder
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally saved temp file
        // as the upload operation got failed at cloudinary.
        console.log("Error in uploading file to cloudinary::", error.message);
        throw error;
        // return null;
    }
}

export { uploadOnCloudinary }