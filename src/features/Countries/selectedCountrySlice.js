import { createSlice,  getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  });
  
export const selectedCountrySlice = createSlice({
    name: 'selectedCountry',
    initialState:{
        selected: ''
    },
    reducers:{
        selectCountry: (state, action) =>{
            state.selected = action.payload;
        }
    }
});

export const selectSelectedCountry = (state) => state.selectedCountry.selected;
export const { selectCountry } = selectedCountrySlice.actions;
export default selectedCountrySlice.reducer;