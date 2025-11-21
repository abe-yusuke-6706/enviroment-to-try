// import React from "react";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Test from "./Pages/Test";
// const root = document.getElementById("root")!;
import Index from "./Pages/Post/Index";
import type { Product } from "./interfaces/post";
const sampleProducts: Product[] = [
    { id: 1, name: "商品A", price: 1000, stock: 10, description: "説明A", user_id: 1 },
    { id: 2, name: "商品B", price: 2000, stock: 5, description: "説明B", user_id: 2 },
];

const App = () => (
  // ReactDOM.createRoot(root).render(
  <Routes>
    <Route path="/" element={<Index products={sampleProducts} /> } />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;