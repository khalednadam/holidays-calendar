import { configureStore } from '@reduxjs/toolkit';
import calendarCReducer  from '../features/CalendarC/calendarCSlice';
import countriesReducer from '../features/Countries/countriesSlice';
import selectedCountryReducer from '../features/Countries/selectedCountrySlice';
export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    calendarC: calendarCReducer,
    selectedCountry: selectedCountryReducer
  },
});
