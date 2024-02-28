import axios from "axios";

const URL = "http://localhost:3001/";

export const searchCountry = (country) => {
  return {
    type: "SEARCH_COUNTRY",
    payload: country,
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + "countries");
      return dispatch({ type: "GET_ALL_COUNTRIES", payload: data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const filterByContinent = (continent) => {
  return {
    type: "FILTER_BY_CONTINENT",
    payload: continent,
  };
};

export const filterByActivity = (activity) => {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload: activity,
  };
};
export const filterByPopulation = (activity) => {
  return {
    type: "FILTER_BY_POPULATION",
    payload: activity,
  };
};
export const sortCountries = (order) => {
  return {
    type: "SORT_COUNTRIES",
    payload: order,
    }
};

export const filterCards = (filter) => {
  return {
    type: 'FILTER_CARDS',
    payload: filter,
  };
};

export const selectCountry = (country) => {
  return {
    type: 'SELECT_COUNTRIES',
    payload: country,
  };
};
