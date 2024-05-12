import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Verify from "./components/Verify.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify/:token" element={<Verify />} />
      <Route path="*" element={<div className="p-8 h-[100vh] text-[3vw] bg-[#000000] text-[#ffffff]">Error 404 Page not found🥲</div>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
