import {  Container, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import './Support.css';
import * as FaIcons from "react-icons/fa";

function Support() {
  const [showForm, setShowMessege] = useState(false)
  const nameRef = useRef('');
  const emailRef = useRef('');
  const teleRef = useRef('');
  const messageRef = useRef('');

  const addAFormHandler = (event) => {
    event.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: teleRef.current.value,
      message: messageRef.current.value,
      timestamp: new Date().toISOString(),
    }
    userDetailHandler(user);
setShowMessege(false)
  }
  const showFormHandler = () => {
    setShowMessege(true);
  }
  async function userDetailHandler(user) {
    console.log(user);
    const response = await fetch('https://mailbox2-baef0-default-rtdb.firebaseio.com//intractedUser.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      alert(
        'Thankyou for reaching us out !!  connecting soon..'      
        )
    }
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="contactbackground">
      <Container>
        <h2 className="contacthead">Facing any issue Or Want to give feedback</h2>
        {
          !showForm &&
          <button className="contactbtn" onClick={showFormHandler}>
            feel free to connect <FaIcons.FaUserNinja/>
          </button>
        }

        {
          showForm &&
          <Form onSubmit={addAFormHandler}>
            <div className="FormContact">
              <Form.Group controlId="formName">
                <Form.Control
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="enter Email Address"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Control
                  as="textarea"
                  name="message"
                  ref={messageRef}
                  rows={4}
                  placeholder=" Type Message Here"
                  required
                />
              </Form.Group>
            </div>
            <br />
            <button className="contactbtn" type="submit">
              Send Message
            </button>
          </Form>

        }
        <hr />

      </Container>
    </div>
  );
}

export default Support;