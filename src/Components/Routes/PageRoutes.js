import React, { Fragment} from "react";
import { Route, Routes } from "react-router";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/LoginPage";
import ForgotPassword from "../Auth/ForgotPassword";
import Compose from '../Pages/Compose';
import Inbox from "../Pages/Inbox";
import Profile from '../Pages/Profile';
import SentMail from "../Pages/SentMail";
import Trash from "../Pages/TrashBox";
import ReadSendMail from "../Data/Mail/ReadSendMail";
import ReadMails from "../Data/Mail/ReadMails";
import SupportPage from "../Pages/SupportPage";
const PageRoutes =({loggedIn})=>{
return(
    <Fragment>
        <Routes>
        {loggedIn && (
            <Fragment>
              <Route path="/*" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/compose" element={<Compose/>} />
              <Route path="/inbox" element={<Inbox/>}/>
              <Route path="/sentmails" element={<SentMail/>}/>
              <Route path="/support"    element={<SupportPage/>} />
              <Route path="/trash" element={<Trash/>}/>
              <Route path="/sendmail/:id" element={<ReadSendMail/>}/>
              <Route path="/email/:id"    element={<ReadMails/>} />
              <Route path="/profile" element={<Profile />} />           
            </Fragment>
          )}
  
          {/* Pages which should render when the user is not logged in */}
         {!loggedIn && (
             <Fragment>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Login />} />
              <Route path='/forgotPassword' element={<ForgotPassword />} />
              </Fragment>
         )}
        </Routes>
    </Fragment>
);
}

export default PageRoutes;