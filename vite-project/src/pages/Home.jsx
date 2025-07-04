import React from "react";
import Products from "../components/Products/Products";
import Category from "../components/Category/Category";
import HrRuler from "../components/HrRuler/HrRuler";
import Hero from "../components/Hero/Hero";
import FlashSales from "../components/FlashSales/FlashSales";
import OurProducts from "../components/OurProducts/OurProducts";
import NewArrival from "../components/NewArrival/NewArrival";

const Home = () => {

  
  return (
    <div>
      <div className="mx-4 sm:mx-[10%]">
        <Hero />
        <FlashSales />
        <HrRuler />
        <Category />
        <HrRuler />
        <Products />
        <OurProducts/>
        <NewArrival/>
      </div>
    </div>
  );
};

export default Home;
