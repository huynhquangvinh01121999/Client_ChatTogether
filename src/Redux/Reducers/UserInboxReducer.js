import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const userInbox = createSlice({
  name: "userInbox",
  initialState,
  reducers: {
    setUserInbox: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { reducer, actions } = userInbox;

export const { setUserInbox } = actions;

export default reducer;
