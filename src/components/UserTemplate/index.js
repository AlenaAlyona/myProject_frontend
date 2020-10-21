import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NewChat from "../Chat/NewChat/NewChat";

const firebase = require("firebase");

export default function UserTemplate(props) {
  const token = useSelector(selectToken);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);

  return (
    <div className="container">
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
          // <NewChat newChatSubmitFn={newChatSubmit}></NewChat>
          <NewChat
            receiver={props.email}
            newChatSubmittedFn={() => setNewChatFormVisible(false)}
          ></NewChat>
        ) : null}
      </div>
      <br />
    </div>
  );
}
