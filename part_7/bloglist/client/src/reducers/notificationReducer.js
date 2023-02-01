const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "CREATE":
      return (state = `You created ${action.payload}`);
    case "VOTE":
      return (state = `You voted for ${action.payload}`);
    case "DELETE":
      return (state = `You deleted ${action.payload}`);
    case "CLEAR":
      return (state = "");
    default:
      return state;
  }
};

export default notificationReducer;
