const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL,"oiwj ewf");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");

const Router = require("./routers/Router");
const connectDb = require("./config/databaseconfig");

const app = express();
app.use(bodyParser.json({ limit: "300kb" }));
connectDb(DATABASE_URL);

const corsOptions = {
    origin: "https://main.d1dfh79902i40l.amplifyapp.com",
    credentials: true,
    optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/",Router);

app.listen(port, () => {console.log("server started")});

module.exports = app;