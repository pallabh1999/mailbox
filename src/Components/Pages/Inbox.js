import React, { Fragment } from "react";
import InboxPage from '../Data/Mail/Inbox';
import NavBar from '../NavBar/NavBar';

const Inbox=()=>{
return(
    <Fragment>
        <NavBar/>
        <InboxPage/>
    </Fragment>
);
}

export default Inbox;