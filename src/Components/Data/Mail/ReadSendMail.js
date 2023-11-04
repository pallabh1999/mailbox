import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import "./ReadSendMail.css"; // Import the CSS file

const ReadSendMail = () => {
  const history = useNavigate();
  const { id } = useParams();
  const mails = useSelector((state) => state.email.send);
  const singleMail = mails.filter((item) => item.id === id);

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header className="custom-card-header">
          Messages
        </Card.Header>
        {singleMail[0] && (
          <Card.Body>
            <Card.Title className="custom-card-title">
              To: {singleMail[0].to}
            </Card.Title>
            <hr/>
            <Card.Text className="custom-card-text">
              <b>Subject: </b>
              {singleMail[0].subject}
            </Card.Text>
            <hr />
            <Card.Text className="custom-card-text">
              <b>on: </b>
              {singleMail[0].time}
            </Card.Text>
            <hr />
            <Card.Text className="custom-card-text">
              <b>Message: </b>
              <div dangerouslySetInnerHTML={{ __html: singleMail[0].message }} />
            </Card.Text>
          </Card.Body>
        )}
        {!singleMail[0] && history("/sentmails")}
      </Card>
    </Fragment>
  );
};

export default ReadSendMail;
