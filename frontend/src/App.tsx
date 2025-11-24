// import React from "react";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Test from "./Pages/Test";
// const root = document.getElementById("root")!;
import Index from "./Pages/Product/Index";
import type { Product } from "./interfaces/product";

const App = () => (
  // ReactDOM.createRoot(root).render(
  <Routes>
    <Route path="/" element={<Index /> } />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;