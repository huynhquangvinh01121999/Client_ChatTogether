import callApi from "axios";
import {
  getListUser,
  updateClientId,
  updateDisconnect,
} from "../Reducers/UserReducer";

const url = "http://localhost:3001";
// const url = "https://chat-socket-mern.herokuapp.com";

export const handleGetUser = (dispatch) => {
  callApi({
    method: "get",
    url: url + "/getUsers",
  })
    .then((res) => {
      dispatch(getListUser(res.data));
    })
    .catch((err) => console.log(err));
};

export const handleUpdateClientId = (dispatch, data) => {
  dispatch(updateClientId(data));
};

export const handleUpdateDisconnect = (dispatch, data) => {
  dispatch(updateDisconnect(data));
};
