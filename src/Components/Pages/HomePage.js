import React, { Fragment } from "react";
import Home from "../Data/Home";
import Navbar from "../NavBar/NavBar";

const HomePage = ()=>{
    return(
        <Fragment>
            <Navbar/>
            <Home/>
        </Fragment>
    );
}

export default HomePage;