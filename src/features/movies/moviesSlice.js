import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const fetchMovies = createAsyncThunk('movies/fetchMovies', async() => {
    const response = await fetch('https://api.matgargano.com/api/movies');
    return response.json();
});


const moviesSlice = createSlice ({
    name: 'movies',
    initialState,
    reducers:{
        sortByYear: (state, action) =>{
            const sortOrder = action.payload === 'asc' ? 1: -1;
            state.data.sort((a,b) => sortOrder * (a.year-b.year));
        },
        sortByLength: (state, action) =>{
            const sortOrder = action.payload === 'asc' ? 1: -1;
            state.data.sort((a,b) => sortOrder * (a.length-b.length));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) =>{
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.payload.error.message;
            })
    }
})


const {sortByYear, sortByLength} = moviesSlice.actions;

export {fetchMovies, sortByYear, sortByLength};

export default moviesSlice.reducer;
