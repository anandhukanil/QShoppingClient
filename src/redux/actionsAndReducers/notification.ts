import { createSlice } from "@reduxjs/toolkit";
import { INotificationState, NotificationTypes, SliceNames, Types } from "../../types";

const INITIAL_STATE: INotificationState = {
  type: NotificationTypes.Info,
  message: "",
  error: ""
};

const productSlice = createSlice({
  name: SliceNames.Notification,
  initialState: INITIAL_STATE,
  reducers: {
    [Types.SET_NOTIFICATION]: (state, action) => {
      return {
        ...state,
        message : action.payload?.message,
        type: action.payload?.type || NotificationTypes.Info
      };
    },
    [Types.CLEAR_NOTIFICATION]: (state) => {
      return {
        ...state,
        message : "",
        type: NotificationTypes.Info
      };
    },
    [Types.CATCH_EXCEPTIONS]: (state, action) => {
      return { ...state, error : action.payload };
    }
  }
});

export const { set_notification, clear_notification, catch_exceptions } = productSlice.actions;

export default productSlice.reducer;