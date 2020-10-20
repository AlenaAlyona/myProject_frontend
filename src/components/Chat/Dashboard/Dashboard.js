import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { useHistory } from "react-router-dom";
import ChatList from "../ChatList/ChatList";

const firebase = require("firebase");

function Dashboard(props) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [chats, setChats] = useState([]);
  const { classes } = props;
  const history = useHistory();

  const newChatBtnClicked = () => {
    setNewChatFormVisible(true);
    setSelectedChat(null);
  };

  const selectChat = (chatIndex) => {
    console.log("SELECTED CHAT", chatIndex);
  };

  useEffect(() => {
    const mount = firebase.auth().onAuthStateChanged(async (_user) => {
      if (!_user) history.push("/login");
      else {
        firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _user.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data());
            if (_user !== null) {
              setEmail(_user.email);
              setChats(chats);
              console.log("USER", _user);
              console.log("INSIDE FIREBASE", chats);
            }
          });
      }
    });
    return () => {
      mount();
    };
  }, [firebase]);

  return (
    <div>
      <div>Hello from Dashboard</div>
      <ChatList
        history={history}
        newChatBtnFn={newChatBtnClicked}
        selectChatFn={selectChat}
        chats={chats}
        userEmail={email}
        selectedChatIndex={selectedChat}
      ></ChatList>
    </div>
  );
}

export default withStyles(styles)(Dashboard);
