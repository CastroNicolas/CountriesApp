/* eslint-disable no-case-declarations */
const initialState = {
  allCountries: [],
  searchResults: [],
  filteredResults: [],
  selectedCountry: null,
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
        filteredResults: [],
      };
    case "GET_ALL_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      };

    case "FILTER_BY_CONTINENT":
      // PREGUNTAR AL PONER FILTRO Y DESPUES BUSCAR ME BUSCA TODOS Y NO LOS DEL FILTRO
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
      const hasFilteredResults = state.filteredResults.length > 0;
      const hasSearchResults = state.searchResults.length > 0;

      let resultsToSort = [];

      if (hasFilteredResults) {
        resultsToSort = [...state.filteredResults];
      } else if (hasSearchResults) {
        resultsToSort = [...state.searchResults];
      } else {
        resultsToSort = [...state.allCountries];
      }

      // Sort the results based on the payload
      if (action.payload === "Ascending") {
        resultsToSort.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "Descending") {
        resultsToSort.sort((a, b) => b.name.localeCompare(a.name));
      }

      // Update the state based on the scenario
      if (hasFilteredResults) {
        return {
          ...state,
          filteredResults: resultsToSort,
        };
      } else if (hasSearchResults) {
        return {
          ...state,
          searchResults: resultsToSort,
        };
      } else {
        return {
          ...state,
          filteredResults: resultsToSort,
          searchResults: resultsToSort,
        };
      }
    case "FILTER_BY_POPULATION":
      const sortedByPopulation = [...state.filteredResults].sort((a, b) => {
        if (action.payload === "Ascending") {
          return b.population - a.population;
        } else if (action.payload === "Descending") {
          return a.population - b.population;
        }
        return 0;
      });

      return {
        ...state,
        filteredResults: sortedByPopulation,
        searchResults: [],
      };
    case "SELECT_COUNTRIES":
      return {
        ...state,
        selectedCountry: action.payload,
      };
    // case "SORT_ACTIVITIES":
    //   const sortedActivities = [...state.myActivities].sort((a, b) => {
    //     const activityA = a.activity.toLowerCase();
    //     const activityB = b.activity.toLowerCase();

    //     return activityA.localeCompare(activityB);
    //   });

    //   return {
    //     ...state,
    //     myActivities: sortedActivities,
    //     searchResults: [],
    //     filteredResults: [],
    //   };
    default:
      return state;
  }
};

export default countryReducer;
