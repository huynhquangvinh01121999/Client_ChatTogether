import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.data = action.payload;
    },

    updateMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

const { reducer, actions } = messages;

export const { getMessages,updateMessage } = actions;

export default reducer;
