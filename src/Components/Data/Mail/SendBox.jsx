import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useSelector ,useDispatch} from "react-redux";
import { getSentData } from "../../../Store/mailAction";
import { Link } from "react-router-dom";
import "./SendBox.css";
import * as FaIcons from "react-icons/fa";

const SendBox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.send);
  const email = useSelector((state) => state.userInfo.email);
  const mail = email.replace(/[@.]/g, "");
  dispatch(getSentData(mail))
  const moveToTrash = async (id) => {

    const res = await fetch(
      `https://mail-boxclient-eb982-default-rtdb.firebaseio.com/${mail}/sentMailbox/${id}.json`,
    );
    let data = await res.json();
    console.log(data);
   
      trash(data);
      DeleteHandler(id);
  };
   const trash = async (data)=>{
    const response = await fetch(
      `https://mail-boxclient-eb982-default-rtdb.firebaseio.com/${mail}/Trashbox.json`,
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
      `https://mail-boxclient-eb982-default-rtdb.firebaseio.com/${mail}/sentMailbox/${id}.json`,
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
       <div className="sendbox-card">
        <h2 className="sendbox-title">SentBox</h2>
        <ListGroup>
          {
            data !== null &&
            data.length > 0 &&
            data.map((email) => {
              return (
                <ListGroup.Item key={email.id} className="sendbox-item">
                  <Link
                    to={`/sendmail/${email.id}`}
                    className="sendboxlk"
                  >
                    <span>
                      <b>To:</b> {email.to}
                    </span>
                    <div className="sendbox-details">
                      <span className="sendbox-subject">
                        <b>Subject: </b>
                        {email.subject}
                      </span>
                      <hr/>
                      <span className="sendbox-date">
                        {new Date(email.time).toLocaleString()}
                      </span>
                    </div>
                  </Link>
                  <Button
                    onClick={() => moveToTrash(email.id)}
                    className="sendbox-delete-button"
                  >
                    <FaIcons.FaTrashRestore/>
                    Delete
                  </Button>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </div>
    </>
  );
};

export default SendBox;