import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Products = () => {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/products/product/delete/${id}`,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      dispatch(fetchProducts());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((d) => (
        <div key={d._id} className="border p-4 shadow rounded">
          <h2 className="text-lg font-bold">{d.title}</h2>
          {d.image ? (
            <img
              src={d.image}
              alt={d.title}
              className="w-full h-40 object-cover mt-2"
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="flex items-center gap-4">
            <Link to={`/dashboared/products/${d._id}`}>Update</Link>
            <Button variant="contained" onClick={() => deleteItem(d._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
