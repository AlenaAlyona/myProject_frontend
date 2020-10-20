import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { useHistory } from "react-router-dom";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import ChatTextBox from "../ChatTextBox/ChatTextBox";

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

  const selectChat = async (chatIndex) => {
    setSelectedChat(chatIndex);
  };

  const buildDocKey = (friend) => [email, friend].sort().join(":");

  const submitMessage = (msg) => {
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
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
      <ChatList
        history={history}
        newChatBtnFn={newChatBtnClicked}
        selectChatFn={selectChat}
        chats={chats}
        userEmail={email}
        selectedChatIndex={selectedChat}
      ></ChatList>
      {newChatFormVisible ? null : (
        <ChatView user={email} chat={chats[selectedChat]}></ChatView>
      )}
      {selectedChat !== null && !newChatFormVisible ? (
        <ChatTextBox submitMessageFn={submitMessage}></ChatTextBox>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(Dashboard);
