import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectAllCities } from "./selectors";

export const CITIES_FETCHED = "CITIES_FETCHED";

const citiesFetched = (data) => ({
  type: CITIES_FETCHED,
  payload: data,
});

export const fetchAllCities = () => {
  console.log("FETCH ALL CITIES outside");
  return async (dispatch, getState) => {
    const cityCount = selectAllCities(getState()).length;
    console.log("FETCH ALL CITIES call");
    if (cityCount > 0) return;

    try {
      const res = await axios.get(`${apiUrl}/city`);
      console.log("RESPONSE IN CITY ACTION", res);
      const cities = res.data;
      dispatch(citiesFetched(cities));
    } catch (error) {
      console.log(error);
    }
  };
};
