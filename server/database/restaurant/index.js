import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        address: { type: String, required: true },
        mapLocation: { type: String, required: true },
        cuisine: [String], // chinese, indian
        restaurantTimings: String,
        contactNumber: Number,
        website: String,
        popularDishes: [String],
        averageCost: Number,
        amenties: [String], //parking, wifi
        menuImages: {
            type: mongoose.Types.ObjectId,
            ref: "Images",
        },
        reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews" }],
        photos: { type: mongoogse.Types.ObjectId, ref: "Images" },
    },
    {
        timestamps: true,
    }
);

export const RestaurantModel = mongoose.model("Rastaurants", RestaurantSchema);
