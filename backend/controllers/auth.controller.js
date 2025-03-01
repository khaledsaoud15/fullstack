const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const admin = require("../lib/firebaseAdmin");
const jwt = require("jsonwebtoken");
const UserSignIn = require("../models/userSignin.model");

const register = async (req, res) => {
  const { username, email, password, address, image, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json("User already exists");
    }

    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      image: req.file ? req.file.path : "",
    });
    await UserSignIn.create({ userId: newUser._id });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (password !== decryptedPassword) {
      return res.status(403).json({ message: "Incorrect Password" });
    }

    const token = {
      id: user._id,
      role: user.role,
    };
    const accessToken = jwt.sign(token, process.env.TOKEN_KEY);

    res.status(200).json({ ...user._doc, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: " + err.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Missing ID Token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      // Generate a random password for Google users
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await CryptoJS.AES.encrypt(
        randomPassword,
        process.env.SECRET_KEY
      );

      user = new User({
        googleId: uid,
        username: name,
        email,
        password: hashedPassword,
        image: picture,
      });

      await user.save();
    }

    const token = {
      id: user._id,
      role: user.role,
    };
    const accessToken = jwt.sign(token, process.env.TOKEN_KEY);

    res.status(200).json({ ...user._doc, accessToken });
  } catch (err) {
    console.error("Google Login Error:", err.message);
    res.status(500).json({ message: "Authentication failed" });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, resetPassword, googleLogin };
