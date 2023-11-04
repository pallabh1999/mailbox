import React, { Fragment } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../NavBar/NavBar";
import { Card } from "react-bootstrap";
import "./ReadSendMail.css"; // Import the CSS file
import { getInboxData } from "../../../Store/mailAction";

const ReadMails = () => {
  const history = useNavigate();
   const dispatch = useDispatch();
  const { id } = useParams();
  const mails = useSelector((state) => state.email.recieved);
  const email =useSelector((state) => state.userInfo.email);
  const recievedMail = email.replace(/[@.]/g, "");

  const singleMail = mails.filter((item) => item.id === id);
  dispatch(getInboxData(recievedMail));
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com/${recievedMail}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, [id, recievedMail]);

  return (
    <Fragment>
        <Navbar/>
    <Card className="custom-card">
      <Card.Header className="custom-card-header">
        Messages
      </Card.Header>
      {singleMail[0] && (
        <Card.Body>
          <Card.Title className="custom-card-title">
            from: {singleMail[0].from}
          </Card.Title>
          <Card.Text className="custom-card-text">
            <b>Subject: </b>
            {singleMail[0].subject}
            <hr />
            <b>on: </b>
            {singleMail[0].time}
            <hr />
            <b>Message: </b>
           <div dangerouslySetInnerHTML={{ __html: singleMail[0].message }} />
           
          </Card.Text>
          
        </Card.Body>
      )}
      {!singleMail[0] && history("/inbox")}
    </Card>
  </Fragment>
  );
};

export default ReadMails;