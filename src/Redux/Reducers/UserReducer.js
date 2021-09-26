import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    getListUser: (state, action) => {
      state.data = action.payload;
    },

    updateClientId: (state, action) => {
      state.data.forEach(function (user) {
        if (user.UserName === action.payload.userInfo) {
          user.ClientId = action.payload.clientId;
          user.Status = action.payload.status;
        }
      });
    },

    updateDisconnect: (state, action) => {
      state.data.forEach(function (user) {
        if (user.ClientId === action.payload.clientId) {
          user.Status = action.payload.status;
        }
      });
    },
  },
});

const { reducer, actions } = users;

export const { getListUser, updateClientId, updateDisconnect } = actions;

export default reducer;
