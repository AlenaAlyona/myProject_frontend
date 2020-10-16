import { LANGS_FETCHED } from "./actions";

const initialState = [];

export default function langReducer(state = initialState, action) {
  switch (action.type) {
    case LANGS_FETCHED:
      return action.payload.sort((a, b) => a.name.localeCompare(b.name));

    default:
      return state;
  }
}
