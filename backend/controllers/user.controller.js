const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

// GET ALL USER
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        image: req.file?.path || req.body.image,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete User

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    // 1️⃣ Find the user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Extract Public ID from Image URL
    if (user.image) {
      const publicId = user.image.split("/").slice(-2).join("/").split(".")[0];

      // 3️⃣ Delete Image from Cloudinary
      await cloudinary.uploader.destroy(publicId);
    }

    // 4️⃣ Delete User from Database
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = { deleteUser };

module.exports = { getAllUsers, updateUser, deleteUser };
