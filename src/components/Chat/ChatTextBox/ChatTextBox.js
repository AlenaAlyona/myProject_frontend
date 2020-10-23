import React, { useState } from "react";
import * as RiIcons from "react-icons/ri";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

function ChatTextBox(props) {
  const [chatText, setChatText] = useState("");
  const { classes } = props;

  const userTyping = (e) =>
    e.keyCode === 13 ? submitMessage() : setChatText(e.target.value);

  const messageValid = (txt) => txt && txt.replace(/\s/g, "").length;

  const submitMessage = () => {
    if (messageValid(chatText)) {
      props.submitMessageFn(chatText);
      document.getElementById("chattextbox").value = "";
    }
  };

  const userClickedInput = () => props.messageReadFn();

  return (
    <div className={classes.chatTextBoxContainer}>
      <TextField
        placeholder="Message"
        onKeyUp={(e) => userTyping(e)}
        id="chattextbox"
        className={classes.chatTextBox}
        onFocus={userClickedInput}
      ></TextField>
      <RiIcons.RiSendPlane2Fill
        value={{ color: "#4550e6" }}
        size="25px"
        onClick={submitMessage}
        className={classes.sendBtn}
      ></RiIcons.RiSendPlane2Fill>
    </div>
  );
}

export default withStyles(styles)(ChatTextBox);
