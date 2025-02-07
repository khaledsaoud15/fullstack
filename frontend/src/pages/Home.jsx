import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <h1>Hello {user.username || user.displayName}</h1>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default Home;
