import { setUserInbox } from "../Reducers/UserInboxReducer";

export const handleSetUserInbox = (dispatch, data) => {
  dispatch(setUserInbox(data));
};
