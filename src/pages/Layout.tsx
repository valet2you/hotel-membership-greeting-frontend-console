import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import Header from "../components/Header";

const Layout = () => {
    return (
        <div className="main-app">
            <Header />
            <Outlet />
        </div>
    );
};



export default Layout