import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NewChat from "../Chat/NewChat/NewChat";

export default function UserTemplate(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);

  // const newChat = () => {
  //   props.newChatBtnFn();
  // };

  const newChat = () => {
    console.log("new chat clicked");
  };

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
        <Button onClick={newChat}>Write a message</Button>
        {newChatFormVisible ? (
          <NewChat
          // goToChatFn={this.goToChat}
          // newChatSubmitFn={this.newChatSubmit}
          ></NewChat>
        ) : null}
      </div>
      <br />
    </div>
  );
}
