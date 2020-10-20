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

const firebase = require("firebase");

function NewChat(props) {
  const { classes } = props;
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState(null);

  const userExists = async () => {
    const usersSnapshot = await firebase.firestore().collection("users").get();
    const exists = usersSnapshot.docs
      .map((_doc) => _doc.data().email)
      .includes(username);
    return exists;
  };

  const buildDocKey = () => {
    return [firebase.auth().currentUser.email, username].sort().join(":");
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

  const createChat = () => {
    props.newChatSubmitFn({
      sendTo: username,
      message: message,
    });
  };

  const submitNewChat = async (e) => {
    e.preventDefault();
    const usExists = await userExists();
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
