import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/picture">首頁</Link>
          </li>
          <li>
            <Link to="/picture/about">關於這個網站</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
