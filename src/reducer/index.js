import { combineReducers } from "redux";
import adduser from "./adduser.reducer";
import userList from "./userList.reducer";

export default combineReducers({
  adduser,
  userList,
});
