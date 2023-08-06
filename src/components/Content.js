import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { motion as m } from "framer-motion";

function Content() {
  return (
    <div className="App">
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Navbar />
      </m.div>
      <Outlet />
    </div>
  );
}

export default Content;
