import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import styles from "./styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/selectors";

const firebase = require("firebase");

function NewChat(props) {
  const { classes } = props;
  const [message, setMessage] = useState(null);
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
    console.log("new chat submit!");
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
    props.newChatSubmittedFn();
  };

  const createChat = () => {
    newChatSubmit({
      sendTo: props.receiver,
      message: message,
    });
  };

  const submitNewChat = async (e) => {
    e.preventDefault();
    const usExists = await userExists();
    console.log("user exists: ", usExists);
    if (usExists) {
      const chExists = await chatExists();
      if (!chExists) {
        createChat();
      }
    }
  };

  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Send a message!
        </Typography>
        <form className={classes.form} onSubmit={(e) => submitNewChat(e)}>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-message">
              Enter your message
            </InputLabel>
            <Input
              required
              id="new-chat-message"
              className={classes.input}
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            ></Input>
          </FormControl>
          <Button
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(NewChat);
