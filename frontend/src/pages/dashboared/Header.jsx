import { Create, DashboardRounded, Home, Web } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 p-4 flex flex-col gap-6  h-screen bg-gray-200 w-1/5">
      <h1 className="text-4xl font-semibold uppercase">Dashboared</h1>
      <div className="flex flex-col gap-4 w-full">
        <Link to="/dashboared/" className="flex items-center gap-4">
          <p className="text-lg font-semibold">Home</p>
          <Home className="!text-lg" />
        </Link>
        <Link to="/" className="flex items-center gap-4">
          <p className="text-lg font-semibold">Website</p>
          <Web className="!text-lg" />
        </Link>
        <Link to="/dashboared/addProduct" className="flex items-center gap-4">
          <p className="text-lg font-semibold">Create</p>
          <Create className="!text-lg" />
        </Link>
        <Link to="/dashboared/products" className="flex items-center gap-4">
          <p className="text-lg font-semibold">All Products</p>
          <DashboardRounded className="!text-lg" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
