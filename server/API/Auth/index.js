// Library
import express from "express";
import { bcrypt } from "bcryptjs";
// import { jwt } from "jsonwebtoken ";
var jwt = require("jsonwebtoken");

// Models
import { UserModel } from "../../database/user/index";

// Router
const Router = express.Router();

/*
? route             /auth/signup
description         register new user
params              -   
access              public
method              POST
*/

Router.post("/signup", async (req, res) => {
    try {
        // using the statics
        await UserModel.findByEmailAndPhone(req.body.credentials);

        // hasing the password
        // hashing will be done in pre
        const newUser = await UserModel.create(req.body.credentials);
        console.log("newUser: ", newUser);

        // generate JWT auth token
        // we are generating the token to login the user into his account straight away without asking him logging again
        // dont store password in token its not required
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
? route             /auth/signin
description         signing in the user
params              -   
access              public
method              POST
*/

Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        const token = user.generateJwtToken();
        console.log("token: ", token);

        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;
