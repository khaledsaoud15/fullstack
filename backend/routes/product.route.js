const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/product.controller");
const { uploadProduct } = require("../lib/multer");
const { verifyAdminAndToken } = require("../middlewares/token");

const router = require("express").Router();

router.post(
  "/product",
  verifyAdminAndToken,
  uploadProduct.single("image"),
  createProduct
);
router.put(
  "/product/update/:id",
  verifyAdminAndToken,
  uploadProduct.single("image"),
  updateProduct
);
router.delete("/product/delete/:id", verifyAdminAndToken, deleteProduct);

router.get("/", getProducts);
router.get("/product/:id", getSingleProduct);

module.exports = router;
