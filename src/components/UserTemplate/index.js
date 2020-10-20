import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NewChat from "../Chat/NewChat/NewChat";

const firebase = require("firebase");

export default function UserTemplate(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);

  // const buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

  // const newChatSubmit = async (chatObj) => {
  //   const docKey = buildDocKey(chatObj.sendTo);
  //   await firebase
  //     .firestore()
  //     .collection("chats")
  //     .doc(docKey)
  //     .set({
  //       receiverHasRead: false,
  //       users: [email, chatObj.sendTo],
  //       messages: [
  //         {
  //           message: chatObj.message,
  //           sender: email,
  //         },
  //       ],
  //     });
  //   setNewChatFormVisible(false);
  //   selectChat(chats.length - 1);
  // };

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
        <Button onClick={() => setNewChatFormVisible(!newChatFormVisible)}>
          Write a message
        </Button>
        {newChatFormVisible ? (
          // <NewChat newChatSubmitFn={newChatSubmit}></NewChat>
          <NewChat></NewChat>
        ) : null}
      </div>
      <br />
    </div>
  );
}
