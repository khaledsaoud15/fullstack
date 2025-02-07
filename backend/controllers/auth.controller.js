const User = require("../models/user.model");
const CryptoJS = require("crypto-js");

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
      image,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

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

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: " + err.message });
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

module.exports = { register, login, resetPassword };
