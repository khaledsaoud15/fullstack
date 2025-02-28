const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

// POST A PRODUCT

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const product = new Product({
      title,
      description,
      price,
      category,
      image: req.file?.path || "",
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product.image) {
      const publicId = product.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      // 3️⃣ Delete Image from Cloudinary
      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file?.path || req.body.image,
        inStock: req.body.inStock,
        quantity: req.body.quantity,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
};
