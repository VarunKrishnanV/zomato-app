import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isVeg: { type: Boolean, required: true },
        isContainsEgg: { type: Boolean, required: true },
        category: { type: String, required: true },

        photos: {
            // creating a relation between the user and the food collection and images
            type: mongoose.Types.ObjectId,
            ref: "Images",
        },
        price: { type: Number, default: 150, required: true },
        addOns: [
            {
                // relation to the same schema as the addon may be the same food item
                type: mongoose.Types.ObjectId,
                ref: "Foods",
            },
        ],
        restaurant: {
            type: mongoose.Types.ObjectId,
            ref: "Restaurants",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const FoodModel = mongoose.model("Foods", FoodSchema);
