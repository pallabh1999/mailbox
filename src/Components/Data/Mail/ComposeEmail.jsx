import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import Button from "react-bootstrap/Button";
import classes from "./ComposeEmail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userAction } from "../../../Store/UserSlice";
import { getSentData } from "../../../Store/mailAction";
const ComposeEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();
  const email = useSelector((state) => state.userInfo.email);
  const sEmail = email.replace(/[@.]/g, "");
  const config = {
    placeholder: "enter message",
    button: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  const emailSendHandeler = async (event) => {
    event.preventDefault();
    const recieverEmail = toInputRef.current.value;
    const rEmail = recieverEmail.replace(/[@.]/g, "");
    const subject = subjectInputRef.current.value;
    const message = messageInputRef.current.value;

    console.log("to", recieverEmail);
    console.log("to", message);
    const compose = {
      from: email,
      subject,
      to: recieverEmail,
      message,
      // 
      time: new Date().toLocaleString("default", { time: "long" }),
    };
    try {
      dispatch(
        userAction.showNotification({
          status: 'pending',
          title: 'sending..',
          message: 'sending email to receiver!',
        })
      )
      const response = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com/${sEmail}/sentMailbox.json`,
        {
          method: "POST",
          body: JSON.stringify(compose),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      dispatch(getSentData(sEmail));  
      dispatch(
        userAction.showNotification({
          status: 'success',
          title: 'Success...',
          message: 'Mail sent successfully!',
        })
      )
    } catch (err) {
      dispatch(
        userAction.showNotification({
          status: 'error',
          title: 'failed',
          message: err,
        })
      )
    }

    try {
      dispatch(
        userAction.showNotification({
          status: 'pending',
          title: 'sending..',
          message: 'sending email to receiver!',
        })
      )
      const response = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com/${rEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: email,
            subject,
            message,
            time: new Date().toLocaleString("default", { time: "long" }),
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      dispatch(
        userAction.showNotification({
          status: 'success',
          title: 'Success...',
          message: 'Mail sent successfully!',
        })
      )
    } catch (err) {
      dispatch(
        userAction.showNotification({
          status: 'error',
          title: 'failed',
          message: err,
        })
      )
    }
    toInputRef.current.value = '';
    subjectInputRef.current.value = '';
    messageInputRef.current.value = '';
  };

  return (
    <div className={classes.composeBG}>
      <section className={classes.auth}>
        <h2>Compose new mail</h2>
        <hr></hr>
        <form onSubmit={emailSendHandeler}>
          <div className={classes.control}>
            <label>To </label>
            <input
              type="email"
              placeholder="Recipient Email"
              className={classes.input}
              ref={toInputRef}
              required
            />
            <hr></hr>
          </div>
          <div className={classes.control}>
            <input
              className={classes.input}
              placeholder="subject"
              required
              ref={subjectInputRef}
            />
          </div>
          <hr></hr>
          <JoditEditor config={config} ref={messageInputRef} required />
          <div>
            <Button
              as="input"
              type="submit"
              value="Send"
              className={classes.btn}
            />
            <Button
              type="button"
              onClick={() => navigate('/home')}
              className={classes.closeButton}
            >
              Close
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ComposeEmail;