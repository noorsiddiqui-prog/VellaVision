const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./Routes/routes");
const authRoutes = require("./Routes/auth.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { config } = require("dotenv");
const passport = require("passport");
const passportAuthRoute = require("./Routes/passportAuth.js")


config(); // Load environment variables from .env file

const PORT = 7000;
app.use(cors());
//Connecting Database
mongoose.connect("mongodb://127.0.0.1:27017/noor-blog", {
  useNewUrlParser: true,
});
// for checking database connection
mongoose.connection.once("open", () => {
  console.log("Database Connected successfully");
});
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));


//passport
app.use(cookieSession(
    {
        name: "session",
        keys: ["lama"],
        maxAge: 24 * 60 * 60 * 100,
    }
));
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }
))

app.use("/auth", passportAuthRoute);






//routing
app.use("/post", routes);
app.use("/auth", authRoutes);
//for connecting the port
app.listen(PORT, () => {
  console.log("Port is connected at " + PORT);
});
