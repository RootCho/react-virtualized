import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { InfiniteScroll } from "./components/infiniteScroll";
import { ProductDetail } from "./components/ProductDetail";
import { Test } from "./components/Test";
export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/products" element={<ProductDetail />} />
    </Routes>
  );
};
