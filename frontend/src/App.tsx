import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
// const root = document.getElementById("root")!;

const App = () => (
// ReactDOM.createRoot(root).render(
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
);

export default App;