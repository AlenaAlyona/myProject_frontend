const styles = (theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  chatTextBoxContainer: {
    position: "fixed",
    bottom: "15px",
    left: "330px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "70%",
    justifyContent: "flex-end",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
});

export default styles;
