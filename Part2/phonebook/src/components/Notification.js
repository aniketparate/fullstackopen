const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === "successfull") {
    const messageStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    return <div style={messageStyle}>{message}</div>;
  } else if (type === "unsuccessfull") {
    const messageStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    return <div style={messageStyle}>{message}</div>;
  }
};

export default Notification;
