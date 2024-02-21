/* eslint-disable no-case-declarations */
const initialState = {
  allCountries: [],
  searchResults: [],
  filteredResults: [],
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_COUNTRY":
      const searchTerm = action.payload.toLowerCase();
      let searchResults;

        searchResults = state.allCountries.filter((country) =>
          country.name.toLowerCase().includes(searchTerm)
        );

      return {
        ...state,
        searchResults: searchResults,
        filteredResults: []
      };
    case "GET_ALL_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      };

    case "FILTER_BY_CONTINENT":
      let filteredCountries = [];
      if (action.payload === "All") {
        filteredCountries = state.allCountries;
      } else {
        if (state.searchResults.length > 0) {
          filteredCountries = state.searchResults.filter(
            (country) => country.continent === action.payload
            );
          } else {
            filteredCountries = state.allCountries.filter(
            (country) => country.continent === action.payload
          );
        }
      }

      return {
        ...state,
        filteredResults: filteredCountries,
      };
    case "SORT_COUNTRIES":
      return {
        ...state,
        filteredResults: [...state.filteredResults].sort((a, b) => {
          const nameA = a.name.toUpperCase(); // Convertir a mayúsculas para ordenar de forma insensible a mayúsculas/minúsculas
          const nameB = b.name.toUpperCase();

          if (action.payload === "Ascending") {
            return nameA.localeCompare(nameB); // Ordenar alfabéticamente ascendente
          }
          if (action.payload === "Descending") {
            return nameB.localeCompare(nameA); // Ordenar alfabéticamente descendente
          }

          return {
            ...state,
            allCountries: [], // Show all countries
            searchResults: [],
          };
        }),
      };
    default:
      return state;
  }
};

export default countryReducer;
// case "FILTER_BY_ACTIVITY":
//   const activityFilter = action.payload;
//   const filteredByActivity = state.allCountries.filter(
//     (country) =>
//       country.activities && country.activities.includes(activityFilter)
//   );

//   return {
//     ...state,
//     filters: {
//       ...state.filters,
//       activity: activityFilter,
//     },
//     filteredCountries: filteredByActivity,
//     currentPage: 1,
//   };
