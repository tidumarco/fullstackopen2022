import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, duration: null },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    clearNotification: (state) => {
      state.message = null;
      state.duration = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification({ message, duration }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
