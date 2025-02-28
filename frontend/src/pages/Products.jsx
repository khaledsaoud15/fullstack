import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/product/productSlice";
import axios from "axios";

const Products = () => {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
    <div className="grid grid-cols-3 gap-4 p-4 w-full h-screen">
      {products.map((d) => (
        <div key={d._id} className="border p-4 shadow rounded">
          <h2 className="text-lg font-bold">{d.title}</h2>
          {d.image ? (
            <img
              src={d.image}
              alt={d.title}
              className="w-full h-40 object-cover mt-2"
              loading="lazy"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
