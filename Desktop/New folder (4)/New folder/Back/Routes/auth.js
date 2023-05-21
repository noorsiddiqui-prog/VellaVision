const express = require("express");
const Auth = require("../Model/auth.js");

const verifyToken = require("../Middleware/auth");
const { createUser, loginUser } = require("../Controller/auth.js");
const cors = require("cors"); //Newly added
const app = express();

app.use(cors()); // Newly added

// const corsOptions = {
//   origin: "http://example.com",
//   optionsSuccessStatus: 200, // for some legacy browsers
// };

app.use(express.json({ limit: "50mb" }));

const router = express.Router();

// Register
router.post("/register", createUser);

// Login
// router.post("/login", cors(), verifyToken, loginUser);
router.post("/login", cors(), loginUser);

module.exports = router;
