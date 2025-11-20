// import React from "react";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Test from "./Pages/Test";
// const root = document.getElementById("root")!;

const App = () => (
  // ReactDOM.createRoot(root).render(
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;