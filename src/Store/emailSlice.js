import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    recieved: [],
    send: [],
    total: 0,
    unread : 0,
    trash :[],
  },

  reducers: {
    recievedMail(state, action) {
      state.recieved = action.payload;
    },
    sendMail(state, action) {
      state.send = action.payload;
    },
    unreadMessage(state, action) {
      state.unread = action.payload;
    },
    totalMessage(state, action) {
      state.total = action.payload;
    },
    trashMail(state,action){
      state.trash = action.payload;
    
    }
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;