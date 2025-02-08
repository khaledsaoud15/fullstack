import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
