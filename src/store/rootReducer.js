import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import city from "./city/reducer";

export default combineReducers({
  appState,
  user,
  city,
});
