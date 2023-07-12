const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "anirban$rrr";

// create a new user
router.post(
  "/createuser",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Eneter a valid password").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let sucess=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ sucess,email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ sucess,errors: "User with this email aleady exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess=true;
      res.json({sucess,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({sucess, errors: "Some error occured" });
    }
  }
);

// Authincate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  
  async (req, res) => {
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess,error:"Not Valid"});
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({sucess,error:"Not Valid"});
      }
      const comppass = await bcrypt.compare(password, user.password);
      if (!comppass) {
        return res.status(400).json({sucess,error:"Not Valid"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess=true;
      res.json({sucess,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: "Some error occured" });
    }
  }
);

// getting logged user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId =  req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: "Some error occured" });
  }
});

module.exports = router;
