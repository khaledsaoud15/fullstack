import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  updateProduct,
} from "../../redux/product/productSlice";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Create } from "@mui/icons-material";

const SingleProductUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, error } = useSelector((state) => state.product);

  const [data, setData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    quantity: 1,
    inStock: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setData({
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        category: product.category || "",
        quantity: product.quantity || 1,
        inStock: product.inStock || "",
      });
      setImage(product.image || "");
    }
  }, [product]);

  const handlInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handlUpdate = () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("inStock", Boolean(data.inStock));
    formData.append("quantity", Number(data.quantity));
    if (image) {
      formData.append("image", image);
    }

    dispatch(updateProduct({ id, formData }));
  };

  return (
    <div className="flex flex-col w-1/3 gap-4 mx-auto absolute top-1/2 left-1/2 -translate-1/2  border border-gray-200 p-8 rounded shadow">
      <h1>Update Product</h1>
      <TextField
        label="Title"
        name="title"
        value={data.title}
        onChange={handlInputs}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={data.description}
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
        value={data.price}
        onChange={handlInputs}
        required
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={data.category}
        onChange={handlInputs}
        required
        fullWidth
      />
      <input type="file" name="image" onChange={handlImage} required />

      <Button
        variant="contained"
        size="small"
        endIcon={<Create />}
        onClick={handlUpdate}
      >
        Update
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SingleProductUpdate;
