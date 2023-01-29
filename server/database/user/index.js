import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },

        // password is not requiredd field as we dont get it from the user while we are logging the user with the google
        password: { type: String },

        // we might have different address for home, office, college -- detials : address, for : type of address
        address: [
            {
                details: { type: String },
                for: { type: String },
            },
        ],

        phoneNumber: [{ type: String }],
    },
    {
        // create the timestamp whenever the data is instered or updated
        timestamps: true,
    }
);

export const UserModel = mongoose.model("Users", UserSchema);
