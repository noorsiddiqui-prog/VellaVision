const Auth = require("../Model/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//creting Api
const createUser = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, username, email, password } = req.body;

    // Validate user input
    if (!(email && password && name && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Auth.create({
      name: name,
      username: username,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).send("Invalid Credentials");

    // Our login logic ends here
  }
};

module.exports = { createUser, loginUser };
