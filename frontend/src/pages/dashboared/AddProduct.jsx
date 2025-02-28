import { Create } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, fetchProducts } from "../../redux/product/productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
  });

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handlInputs = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlImage = (e) => {
    setImage(e.target.files[0]);
  };

  const postData = async () => {
    const products = new FormData();
    products.append("title", formData.title);
    products.append("description", formData.description);
    products.append("price", Number(formData.price));
    products.append("category", formData.category);

    if (image) {
      products.append("image", image);
    } else {
      console.error("No image selected.");
    }

    try {
      await dispatch(createProduct(products));
      dispatch(fetchProducts());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-1/3 gap-4 mx-auto absolute top-1/2 left-1/2 -translate-1/2  border border-gray-200 p-8 rounded shadow">
      <h1>Create Product</h1>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handlInputs}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handlInputs}
        required
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handlInputs}
        required
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handlInputs}
        required
        fullWidth
      />
      <input type="file" name="image" onChange={handlImage} required />

      <Button
        variant="contained"
        size="small"
        endIcon={<Create />}
        onClick={postData}
      >
        Create
      </Button>
    </div>
  );
};

export default AddProduct;
