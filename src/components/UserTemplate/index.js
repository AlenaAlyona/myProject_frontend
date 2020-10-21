import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NewChat from "../Chat/NewChat/NewChat";

export default function UserTemplate(props) {
  const token = useSelector(selectToken);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className="container">
      <>
        <Alert
          show={alert}
          variant="success"
          onClose={() => setAlert(false)}
          dismissible
        >
          <Alert.Heading>Message to {props.firstName} is sent!</Alert.Heading>
          You can check out your conversation in {""}
          <Alert.Link href="/chat">chat</Alert.Link>
        </Alert>
      </>
      <div>
        <h3>
          {props.firstName} {props.lastName}
        </h3>
        <p>{props.cityName}</p>
        <p>{props.bio}</p>
        <div>
          {props.children.map((child) => {
            return <p key={child.id}>Child's age: {child.age}</p>;
          })}
        </div>
        <Button onClick={() => setNewChatFormVisible(true)}>
          Write a message
        </Button>
        {newChatFormVisible ? (
          <NewChat
            receiver={props.email}
            newChatSubmittedFn={function (sent) {
              setNewChatFormVisible(false);
              if (sent) {
                setAlert(true);
              }
            }}
          ></NewChat>
        ) : null}
      </div>
      <br />
    </div>
  );
}
