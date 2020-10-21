import React, { useState } from "react";
import { Modal, InputGroup, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/selectors";

const firebase = require("firebase");

export default function NewChat(props) {
  const { classes } = props;
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(true);

  const user = useSelector(selectUser);
  const email = user.email;

  const userExists = async () => {
    const usersSnapshot = await firebase.firestore().collection("users").get();
    const exists = usersSnapshot.docs
      .map((_doc) => _doc.data().email)
      .includes(props.receiver);
    return exists;
  };

  const buildDocKey = () => {
    return [email, props.receiver].sort().join(":");
  };

  const chatExists = async () => {
    const docKey = buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  };

  const newChatSubmit = async (chatObj) => {
    const docKey = buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: email,
          },
        ],
      });
  };

  const createChat = () => {
    newChatSubmit({
      sendTo: props.receiver,
      message: message,
    });
  };

  const sendMsg = () => {
    const docKey = buildDocKey();
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: message,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  const submitNewChat = async (e) => {
    console.log("SUBMIGT");
    e.preventDefault();
    const usExists = await userExists();
    if (usExists) {
      const chExists = await chatExists();
      if (!chExists) {
        createChat();
      } else {
        sendMsg();
      }
      props.newChatSubmittedFn();
    } else {
      console.log("USER DOESNT EXIST");
    }
  };

  return (
    <>
      <Modal show={show} onHide={props.newChatSubmittedFn}>
        <Modal.Header closeButton onClick={props.newChatSubmittedFn}>
          <Modal.Title>Send a message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitNewChat(e)}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Message"
                aria-label="Message"
                aria-describedby="basic-addon2"
                onChange={(e) => setMessage(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
