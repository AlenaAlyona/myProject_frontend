import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectAllLangs, selectUsersWithLang } from "./selectors";

export const LANGS_FETCHED = "LANGS_FETCHED";
export const USER_WITH_LANGS_FETCHED = "USER_WITH_LANGS_FETCHED";

const langsFetched = (data) => ({
  type: LANGS_FETCHED,
  payload: data,
});

const usersWithLangsFetched = (data) => ({
  type: USER_WITH_LANGS_FETCHED,
  payload: data,
});

export const fetchAllLangs = () => {
  return async (dispatch, getState) => {
    const langCount = selectAllLangs(getState()).length;
    if (langCount > 0) return;

    try {
      const res = await axios.get(`${apiUrl}/language`);
      console.log("RESPONSE IN LANG ACTION", res);
      const langs = res.data;
      dispatch(langsFetched(langs));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUsersWithLang = (languageId) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${apiUrl}/language/${languageId}/users`);
      console.log("RESPONSE IN LANG ACTION, SLECTED USERS", res);
      const usersWithLang = res.data;
      dispatch(usersWithLangsFetched(usersWithLang));
    } catch (error) {
      console.log(error);
    }
  };
};
