import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        // we will be storing the images in aws so whenever the image is stored in aws server it will retun the url for that image
        // array bcz we can upload mulitiple images at a single shot
        images: [
            {
                location: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const ImageModel = mongoose.model("Images", ImageSchema);
