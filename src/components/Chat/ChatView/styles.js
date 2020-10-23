import { TextareaAutosize } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { findByLabelText } from "@testing-library/react";

const styles = (theme) => ({
  content: {
    height: "70%",
    overflow: "auto",
    padding: "80px",
    marginLeft: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "80px",
    width: "70%",
    position: "fixed",
    zIndex: 1,
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#388DDE",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#388DDE",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  chatHeader: {
    width: "80%",
    height: "58px",
    backgroundColor: "#98C7F3",
    position: "fixed",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "10px",
    boxSizing: "border-box",
    zIndex: "1",
    overflow: "auto",
  },
});

export default styles;
