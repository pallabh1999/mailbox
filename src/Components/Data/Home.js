import React from "react";
// import mailImg from'../Assets/rascal-mail.gif'
import './Home.css';
import { useSelector } from "react-redux";
const Home =()=>{
  const total = useSelector((state)=>state.email.total);
  const unread = useSelector((state)=>state.email.unread);
  return (
    <div className="centered-box">
      <h2 style={{ textAlign: "center" }}>Welcome to your MailBox.</h2>
      {/* <img src={mailImg} alt="Mailbox" /> */}
      <h3 style={{color:'aqua', fontSize:"15px" }}>You have {unread} new Messages to read &  {total} total Messages</h3>
    </div>
  );
}
export default Home;