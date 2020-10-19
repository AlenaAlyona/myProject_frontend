import { LANGS_FETCHED, USER_WITH_LANGS_FETCHED } from "./actions";

const initialState = {
  allLangs: [],
  usersWithLang: [],
};

export default function langReducer(state = initialState, action) {
  switch (action.type) {
    case LANGS_FETCHED:
      return {
        ...state,
        allLangs: action.payload.sort((a, b) => a.lang.localeCompare(b.lang)),
      };

    case USER_WITH_LANGS_FETCHED:
      return { ...state, usersWithLang: action.payload };

    default:
      return state;
  }
}
