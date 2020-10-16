import { CITIES_FETCHED } from "./actions";

const initialState = [];

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case CITIES_FETCHED:
      return action.payload;

    default:
      return state;
  }
}
