import React from "react";
import ComposeEmail from "../Data/Mail/ComposeEmail";
import Navbar from "../NavBar/NavBar";

const Compose = ()=>{
    return(
        <React.Fragment>
            <Navbar/>
            <ComposeEmail/>
        </React.Fragment>
    );
}
export default  Compose;