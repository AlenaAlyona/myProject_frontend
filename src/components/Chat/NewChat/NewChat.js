import React from "react";
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

  return <div>Hello from New Chat</div>;
}

export default withStyles(styles)(NewChat);
