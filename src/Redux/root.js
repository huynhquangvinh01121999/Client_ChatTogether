import UserReducer from "./Reducers/UserReducer";
import MessagesReducer from "./Reducers/MessagesReducer";
import UserInboxReducer from "./Reducers/UserInboxReducer";

export const rootReducer = {
  users: UserReducer,
  messages: MessagesReducer,
  userInbox: UserInboxReducer,
};
