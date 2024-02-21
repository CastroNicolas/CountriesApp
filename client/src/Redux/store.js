import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './reducer';

const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

export default store;