// Library
import { express } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken ";

// Models
import { UserModel } from "../../database/user/index";

const Router = express.Router();

/*
? route             /signup
description         register new user
params              -   
access              public
method              POST
*/

Router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullName, phoneNumber } = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        // check whether email or phone exist already in DB
        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ email: "User already exists" });
        }

        // hasing the password
        const bcryptSalt = await bcrypt.genSalt(8); // Note :  keep the saltrounds min - 8 recmommended
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        // save to DB
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword,
        });

        // generate JWT auth token
        // we are generating the token to login the user into his account straight away without asking him logging again

        // dont store password in token its not required
        const token = jwt.sign({ user: { fullName, email } }, "zomato");
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
