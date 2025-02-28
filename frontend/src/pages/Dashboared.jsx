import { Route, Routes } from "react-router-dom";
import Header from "./dashboared/Header";
import AddProduct from "./dashboared/AddProduct";
import Products from "./dashboared/Products";
import SingleProductUpdate from "./dashboared/SingleProductUpdate";
import Home from "./dashboared/Home";

const Dashboared = () => {
  return (
    <>
      <div className="flex">
        <Header />
        <div className="w-4/5 ml-auto">
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProductUpdate />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboared;
