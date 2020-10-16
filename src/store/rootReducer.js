import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import city from "./city/reducer";
import language from "./language/reducer";

export default combineReducers({
  appState,
  user,
  city,
  language,
});
