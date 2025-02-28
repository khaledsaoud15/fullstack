import React from "react";
import Stats from "./Stats";
import AllUsers from "./AllUsers";

const Home = () => {
  return (
    <section className="flex flex-col p-8 w-full h-full gap-8">
      <Stats />
      <AllUsers />
    </section>
  );
};

export default Home;
