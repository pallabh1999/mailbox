import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData, UserProfile } from "./NavData";
import { useSelector } from "react-redux";
import "./Nav.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/UserAction";

function Navbar() {
const dispatch = useDispatch()
  const [sidebar, setSidebar] = useState(false);
   const userName =  useSelector((state)=> state.userInfo.userName)
   const unread = useSelector((state)=>state.email.unread);
  const showSidebar = () => setSidebar(!sidebar);

  function handleLogoutClick() {
    console.log("User clicked on Logout");
    dispatch(logOut());
  }
  return (
    <>
      <div className="navbar">
      <Link to="#" className="menu-bars">
    <div className="sidebar-icon">
      <FaIcons.FaBars onClick={showSidebar} />
      {unread > 0 && (
        <span className="badge">{unread}</span>
       )} 
    </div>
  </Link>
        <Link to="/home" className="homeIcon">
          <h3>MailReach</h3>
          </Link>
      
       
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" >
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" onClick={showSidebar} >
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} onClick={showSidebar}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <ul className="nav-bottom">
            <div className="nav-dropdown">
              <Link to="#" className="dropNav-text">
                {UserProfile.icon}
                <span>{userName != null ? userName : UserProfile.title}</span>
              </Link>
              <ul className="dropdown-menu">
                <li className={UserProfile.dropdown[0].cName}>
                  <Link to={UserProfile.dropdown[0].path}>
                    {UserProfile.dropdown[0].title} {UserProfile.dropdown[0].icon}
                  </Link>
                  <hr />
                </li>
                <li className={UserProfile.dropdown[1].cName}>
                  <Link to={UserProfile.dropdown[1].path} onClick={handleLogoutClick}>
                    {UserProfile.dropdown[1].title} {UserProfile.dropdown[1].icon}
                  </Link>
                  <hr />
                </li>
              </ul>
            </div>
          </ul>
          
          
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
