import { ArrowRightAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-screen flex items-center p-8 bg-hero bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="flex flex-col gap-2">
        <span className="tracking-wider">Black Friday in july</span>
        <h2 className="text-6xl font-bold leading-none">Up to 50% off</h2>
        <span>Hundreds of styles available</span>
        <Button
          variant="contained"
          className="!bg-black !w-fit"
          endIcon={<ArrowRightAlt />}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default Hero;
