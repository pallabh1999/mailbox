import React, { useCallback, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../../../Store/emailSlice";
import { Link } from "react-router-dom";
import "./Trash.css";
import * as FaIcons from "react-icons/fa";

const TrashBox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.trash);
  const email = useSelector((state) => state.userInfo.email);
  const mail = email.replace(/[@.]/g, "");
  const [loader, setLoader] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com/${mail}/Trashbox.json`
      );
      const data = await res.json();
      const arr = Object.entries(data).map(([id, emailData]) => ({ id, ...emailData }));
      dispatch(emailActions.trashMail(arr));
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  }, [mail, dispatch]);

  const deleteEmail = async (id) => {
    try {
      await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com/${mail}/Trashbox/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
    <div className="trashBody">
     <h2 className="trash-title">TrashBox</h2>
     <h5>Deleting mails form here results in permanent deletion of mails</h5>
     <hr/>
     <ListGroup>
       {loader && data.length > 0 && <h5>Loading....</h5>}
       {!loader &&
         data !== null &&
         data.length > 0 &&
         data.map((email) => {
           return (
             <ListGroup.Item key={email.id} className="trash-item">
               <Link
                 to={`/sendmail/${email.id}`}
                 className="trash-link"
               >
                {
                  email.to &&(
                    <span>
                   <b>To:</b> {email.to}
                 </span>
                  )
                }
                  {
                  email.from &&(
                    <span>
                   <b>From:</b> {email.from}
                 </span>
                  )
                }
                
               </Link>
               <div className="trash-details">
                   <span className="trash-subject">
                     <b>Subject: </b>
                     {email.subject}
                   </span>
                   <span className="trash-date">
                     {new Date(email.time).toLocaleString()}
                   </span>
                 </div>
               <Button
                 onClick={() => deleteEmail(email.id)}
                 className="trash-delete-button"
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

export default TrashBox;