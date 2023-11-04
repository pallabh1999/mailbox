import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "All Mails",
    path: "/inbox",
    icon: <FaIcons.FaMailBulk />,
    cName: "nav-text",
  },
  {
    title: "Compose",
    path: "/compose",
    icon: <IoIcons.IoMdPaperPlane />,
    cName: "nav-text",
  },
 
 
  {
    title: "Trash",
    path: "/trash",
    icon: <FaIcons.FaTrash/>,
    cName: "nav-text",
  },
  {
    title: "Sent",
    path: "/sentmails",
    icon: <IoIcons.IoMdSend/>,
    cName: "nav-text",
  },
  
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  
];

export const UserProfile = {
    title: "User123",
    path: "/profile",
    icon: <FaIcons.FaUserCircle />,
    cName: "nav-text",
    dropdown: [
      { title: "Profile", path: "/profile", cName: "dropdown-link", icon : <FaIcons.FaUserEdit/> },
      { title: "Logout", path: "/login",  cName: "dropdown-link" , icon : <FaIcons.FaSignOutAlt/> },
    ],
  };