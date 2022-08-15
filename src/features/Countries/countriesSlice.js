import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
    'countries/loadCountries',
    async () =>{
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            return json;
        }catch(err){
            console.log(err);
        }
    }
);

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        data:[],
        isLoading: false,
        failedToLoad: false,
        selectedCountry: ''
    },
    extraReducers:{
        [loadCountries.pending]: (state) =>{
            state.isLoading = true;
            state.failedToLoad = false;
        },
        [loadCountries.fulfilled]: (state, action) =>{
            state.isLoading = false;
            state.failedToLoad = false;
            state.data = action.payload !== undefined ? action.payload.map(country =>{
                return{
                    name: country.name.common,
                    code: country.altSpellings[0],
                }
            }): 'failed'
        },
        [loadCountries.rejected]: (state) =>{
            state.isLoading = false;
            state.failedToLoad = true;
        }
    }
});

export const selectCountries = (state) => state.countries.data;
export const selectIsFailed = (state) => state.countries.failedToLoad;
export const selectIsLoading = (state) => state.countries.isLoading;
export default countriesSlice.reducer;