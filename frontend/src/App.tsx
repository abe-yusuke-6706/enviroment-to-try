import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

// const root = document.getElementById("root")!;

const App = () => (
// ReactDOM.createRoot(root).render(
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
);

export default App;