import React, { Fragment } from "react";
import ProfileForm from "../Auth/UserProfile";
import NavBar from '../NavBar/NavBar'

const Profile = ()=>{
return(
    <Fragment>
        <NavBar/>
            <ProfileForm/>
       
       
    </Fragment>
);
}

export default Profile;