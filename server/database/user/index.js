import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

//  Statics and  Methods

// methods are available only when the processs of saving or updating or other process as intiatied
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "z0M@t0@pplIc@tion");
};

// statics are functions attached to the schema
UserSchema.statics.findByEmailAndPassword = async function ({
    password,
    email,
}) {
    // check whether the email exists;
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User doesn't exists");

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    // check whether email or phone exist already in DB
    if (checkUserByEmail || checkUserByPhone) {
        // we can't use res, req here as it not available in mongoose
        // return res.json({ email: "User already exists" });
        throw new Error("User already exists :(");
    }

    return false;
};

// pre runs before performing the transaction
UserSchema.pre("save", function (next) {
    const user = this;
    console.log("user: ", user);

    // password is modified
    if (!user.isModified("password")) return next();
    console.log('!user.isModified("password"): ', !user.isModified("password"));

    // password bcrpt salt
    bcrypt.genSalt(8, function (error, salt) {
        if (error) return next(error);

        // hash the passowrd
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);
