import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Inbox.css';
import * as FaIcons from "react-icons/fa";
// import mailImg from '../../Assets/nomail-removebg-preview.png'

const Inbox = () => {
  const data = useSelector((state) => state.email.recieved);
  const email = useSelector((state) => state.userInfo.email);
  const mail = email.replace(/[@.]/g, "");
  

  const moveToTrash = async (id) => {

    const res = await fetch( 
      `https://mailbox2-baef0-default-rtdb.firebaseio.com/${mail}/inbox/${id}.json`,
    );
    let data = await res.json();
      trash(data);
      DeleteHandler(id);
  };
   const trash = async (data)=>{
    const response = await fetch(
      `https://mailbox2-baef0-default-rtdb.firebaseio.com/${mail}/Trashbox.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
   }
  const DeleteHandler = async (id) => {
  
    const res = await fetch(
      `https://mailbox2-baef0-default-rtdb.firebaseio.com/${mail}/inbox/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await res;
    console.log(data);
   
  };


  return (
    <>
        <h2 style={{ textAlign: "center" }}>Inbox</h2>
        <hr />
        <div className="InboxBody">
        <ListGroup>
       
          {data.length === 0 &&(
          <div className="noMailbox">
          <h2 style={{ textAlign: "center" }}>You have not received any mail so far...!!!!</h2>
          {/* <img src={mailImg} alt="noMail" /> */}
        </div>
          )}
          {
            data !== null &&
            data.length > 0 &&
            data.map((email) => {
              return (
                <ListGroup.Item
                  key={email.id}
                  className={email.read ? "email-item" : 'Uemail-item'} 
                >
                  {email.read && (
                         <span>
                        <p className="mt-2 me-3 ms-0" style={{ float: "left"}}>
                          🟢
                        </p>
                        </span>
                      )}
                   
                  <Link
                    to={`/email/${email.id}`}
                    className="email-link"
                  >
                     <span>
                      <b>From:</b> {email.from}
                    
                    <br/>
                   
                    </span>
                    <span>
                      <b>Subject: </b>
                      {email.subject}
                    </span>
                    <span style={{color: 'grey',}}>
                    <div dangerouslySetInnerHTML={{ __html: (email && email.message) ? 
                      email.message.substring(0, 14) + '...' : '' }} />

                    </span>
                  </Link>
                  <span className="email-date">
                      {new Date(email.time).toLocaleString()}
                    </span>
                  <Button
                    onClick={() => moveToTrash(email.id)}
                    className="dltBtn"
                  ><FaIcons.FaTrash/>
                    
                  </Button>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        </div>
    </>
  );
};

export default Inbox;
