import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loadEvents = createAsyncThunk(
    'calendarC/loadEvents',
    async (countryCode) =>{
        try{
            const response = await fetch(`http://localhost:8000/${countryCode}`);
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            return json;
        }catch(err){
            console.log(err);
        }
    }
    
)

export const calendarC = createSlice({
    name: 'calendarC',
    initialState:{
        data:[],
        isLoading: false,
        failedToLoad: false
    },
    extraReducers:{
        [loadEvents.pending]: (state) =>{
            state.isLoading = true;
            state.failedToLoad = false;
        },
        [loadEvents.fulfilled]: (state, action) =>{
            state.isLoading = false;
            state.failedToLoad = false;
            state.data = action.payload !== undefined ? action.payload.response.holidays.map((holiday) =>{
                return{
                    title: holiday.name,
                    allDay: true,
                    start: new Date(holiday.date.datetime.year, holiday.date.datetime.month - 1, holiday.date.datetime.day),
                    end: new Date(holiday.date.datetime.year, holiday.date.datetime.month - 1, holiday.date.datetime.day + 1),
                };
            }): 'failed'
        },
        [loadEvents.rejected]: (state) =>{
            state.isLoading = false;
            state.failedToLoad = true;
        }
    }

});

export default calendarC.reducer;
export const selectEvents = (state) => state.calendarC.data;
export const selectIsFailedToLoadEvents = (state) => state.calendarC.failedToLoad;
export const selectIsLoadingEvents = (state) => state.calendarC.isLoading;