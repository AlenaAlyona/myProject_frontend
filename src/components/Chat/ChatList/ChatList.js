import React, { useEffect } from "react";
import "./chatlist.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

export default function ChatList(props) {
  useEffect(() => {
    const container = document.getElementById("chatlist");
    if (container) container.scrollTo(0, container.scrollHeight);
  });

  const selectChat = (index) => {
    props.selectChatFn(index);
  };

  const userIsSender = (chat) =>
    chat.messages[chat.messages.length - 1].sender === props.userEmail;

  if (props.chats.length > 0) {
    return (
      <main className="chatlist">
        <style>
          {`
   .list-group-item.disabled,
   .list-group-item:disabled {
     color: #fff;
     pointer-events: none;
     background-color: #98C7F3;
   }

   .list-group-item {
    display: flex;
  }
    `}
        </style>
        <ListGroup defaultActiveKey="#mainList">
          <ListGroup.Item action disabled action id="viewHeader">
            <h5>
              <b>Chats</b>
            </h5>
          </ListGroup.Item>
          {props.chats.map((_chat, _index) => {
            return (
              <div key={_index}>
                <ListGroup.Item
                  action
                  onClick={() => selectChat(_index)}
                  selected={props.selectedChatIndex === _index}
                  className="listItem"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">
                      {
                        _chat.users
                          .filter((_user) => _user !== props.userEmail)[0]
                          .split("")[0]
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      _chat.users.filter(
                        (_user) => _user !== props.userEmail
                      )[0]
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" color="textPrimary">
                          {_chat.messages[
                            _chat.messages.length - 1
                          ].message.substring(0, 30)}
                        </Typography>
                      </React.Fragment>
                    }
                  ></ListItemText>
                  {_chat.receiverHasRead === false && !userIsSender(_chat) ? (
                    <ListItemIcon>
                      <NotificationImportant></NotificationImportant>
                    </ListItemIcon>
                  ) : null}
                </ListGroup.Item>
              </div>
            );
          })}
        </ListGroup>
      </main>
    );
  } else {
    return (
      <main>
        <ListGroup defaultActiveKey="#mainList">
          {" "}
          <div>Chats</div>
        </ListGroup>
      </main>
    );
  }
}

// export default withStyles(styles)(ChatList);
