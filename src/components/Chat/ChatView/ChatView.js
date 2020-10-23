import "./chatview.css";
import React, { useEffect } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core";

function ChatView(props) {
  const { classes, chat, user } = props;

  useEffect(() => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  });

  if (chat === undefined) {
    return <main id="chatview-container"></main>;
  } else {
    return (
      <div className="chatview">
        <div className={classes.chatHeader}>
          <h5>
            <b>
              Your conversation with{" "}
              {chat.users.filter((_usr) => _usr !== user)[0]}
            </b>
          </h5>
        </div>

        <main id="chatview-container">
          {chat.messages.map((_msg, _index) => {
            return (
              <div
                key={_index}
                className={
                  _msg.sender === user ? classes.userSent : classes.friendSent
                }
              >
                {_msg.message}
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(ChatView);
