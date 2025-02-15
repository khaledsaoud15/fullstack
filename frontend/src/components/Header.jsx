import { Login, Logout, Settings, ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

const DropDown = ({ active, logoutFN }) => {
  return (
    <div
      className={`flex flex-col  w-32 ${
        active ? "h-fit" : "h-0"
      } bg-white rounded shadow absolute top-[140%] overflow-hidden left-1/2 -translate-x-1/2`}
    >
      <Link
        to="/profile"
        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 h-full w-full"
      >
        <p>Profile</p>
        <Settings className="!text-sm" />
      </Link>
      <div
        onClick={() => logoutFN()}
        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 h-full w-full"
      >
        <p>Logout</p>
        <Logout className="!text-sm" />
      </div>
    </div>
  );
};

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const logOutUser = () => {
    dispatch(logout());
  };

  return (
    <header className="h-24 bg-transparent w-full absolute z-10 top-0 flex items-center">
      <nav className="flex items-center justify-between px-16 w-full">
        <img
          src="./assets/images/logo.png"
          alt="logo"
          loading="lazy"
          className="h-full"
        />
        <div className="space-x-8">
          <a href="#" className="text-main">
            Home
          </a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
        </div>
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <ShoppingCart />
              <div className="relative">
                <img
                  src={user.image || "./assets/images/user.png"}
                  alt={user.username}
                  className="w-6 h-6 rounded-full cursor-pointer"
                  onClick={() => setActive(!active)}
                />
                <DropDown active={active} logoutFN={logOutUser} />
              </div>
            </div>
          ) : (
            <Button
              variant="contained"
              size="medium"
              className="!bg-main"
              endIcon={<Login />}
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
