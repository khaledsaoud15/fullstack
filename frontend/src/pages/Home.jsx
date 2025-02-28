import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Products />
    </div>
  );
};

export default Home;
