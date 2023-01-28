import express from "express";
import cors from "cors"
import helmet from "helmet";

const zomato = express();

// cross origin resource sharing helps us to send response between to different apps (forntend and backend) deployed in to different locations. In the absence of this the server on request will restrict the user
zomato.use(cors())

// helment is used for additional security to the server
zomato.use(helmet())

// this is to make ther server accept the json
zomato.use(express.json());

// we use this to make the server accept data other than json as well in case the data comes along with other data which are not in json format
zomato.use(express.urlencoded({extended : false}))

zomato.get("/", (req, res) => {
    res.json({ message: "server is running " });
});

zomato.listen(4000, () =>
    console.log("Server is running at http://localhost:4000")
);
