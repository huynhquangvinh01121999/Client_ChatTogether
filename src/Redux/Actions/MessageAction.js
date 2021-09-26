import callApi from "axios";
import { getMessages, updateMessage } from "../Reducers/MessagesReducer";

const url = "http://localhost:3001";
// const url = "https://chat-socket-mern.herokuapp.com";

export const handleMessageToMe = (dispatch) => {
  const user = localStorage.getItem("userInfo");
  callApi({
    method: "get",
    url: url + `/getMessagesToMe?username=${user}`,
  })
    .then((res) => {
      // console.log(res.data);
      dispatch(getMessages(res.data));
    })
    .catch((err) => console.log(err));
};

export const handleUpdateMessage = (dispatch, data) => {
  dispatch(updateMessage(data));
};
