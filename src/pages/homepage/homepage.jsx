import React from "react";
import Content from "../../components/content/content";
import Header from "../../components/header/header";
import "./home.css";
const Homepage = ()=>{
    return (
        <div className="main-container">
            <Header/>
            <Content/>
        </div>
    )
};

export default Homepage;