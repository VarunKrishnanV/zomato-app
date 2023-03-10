require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

// database connection
import ConnectDB from "./database/connection.js";

// router
import Auth from "./API/Auth";

const zomato = express();

// cross origin resource sharing helps us to send response between to different apps (forntend and backend) deployed in to different locations. In the absence of this the server on request will restrict the user
zomato.use(cors());

// helment is used for additional security to the server
zomato.use(helmet());

// this is to make ther server accept the json
zomato.use(express.json());

// we use this to make the server accept data other than json as well in case the data comes along with other data which are not in json format
zomato.use(express.urlencoded({ extended: false }));

zomato.get("/", (req, res) => {
    res.json({ message: "server is running " });
});

zomato.use("/auth", Auth);

zomato.listen(4000, () => {
    ConnectDB()
        .then(console.log("Server and DB is running at http://localhost:4000"))
        .catch(() => console.log("server running and db connection failed"));
});
