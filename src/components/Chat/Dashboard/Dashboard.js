import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/user/selectors";
import ChatList from "../ChatList/ChatList";
import ChatView from "../ChatView/ChatView";
import ChatTextBox from "../ChatTextBox/ChatTextBox";

const firebase = require("firebase");

export default function Dashboard(props) {
  const history = useHistory();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [chats, setChats] = useState([]);
  const token = useSelector(selectToken);

  if (token === null) {
    history.push("/");
  }

  const selectChat = (chatIndex) => {
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

  const clickedChatWhereNotSender = (chatIndex) =>
    chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !==
    email;

  const messageRead = () => {
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    if (clickedChatWhereNotSender(selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("Clicked message where the user was the sender");
    }
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
            }
          });
      }
    });
    if (selectedChat !== null) {
      messageRead();
    }

    return () => {
      mount();
    };
  }, [selectedChat, history]);

  return (
    <div className="mainDiv">
      <ChatList
        history={history}
        selectChatFn={selectChat}
        chats={chats}
        userEmail={email}
        selectedChatIndex={selectedChat}
      ></ChatList>
      {newChatFormVisible ? null : (
        <ChatView user={email} chat={chats[selectedChat]}></ChatView>
      )}
      {selectedChat !== null && !newChatFormVisible ? (
        <ChatTextBox
          submitMessageFn={submitMessage}
          messageReadFn={messageRead}
        ></ChatTextBox>
      ) : null}
    </div>
  );
}
