import React, { useState } from "react";
import "./index.css";
import { Button, Alert } from "react-bootstrap";
import NewChat from "../Chat/NewChat/NewChat";
import { IconContext } from "react-icons";
import * as GrIcons from "react-icons/gr";

export default function UserTemplate(props) {
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className="userContainer">
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
      <IconContext.Provider value={{ color: "#4550e6" }}>
        <div>
          <h3>
            {props.firstName} {props.lastName}
          </h3>
          <p>
            <GrIcons.GrLocation /> {props.cityName}
          </p>
          <p>{props.bio}</p>
          <div>
            {props.children.length > 1 ? (
              <p>
                Children age:
                {props.children.map((child) => {
                  return <span key={child.id}>{child.age}</span>;
                })}
              </p>
            ) : (
              <p>
                Child age:
                {props.children.map((child) => {
                  return <span key={child.id}>{child.age}</span>;
                })}
              </p>
            )}
          </div>
          <style>
            {`
    .btn-flat {
      background-color: #4550e6;
      color: white;
    }
    `}
          </style>
          <Button variant="flat" onClick={() => setNewChatFormVisible(true)}>
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
      </IconContext.Provider>
    </div>
  );
}
