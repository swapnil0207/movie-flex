import { combineReducers } from "@reduxjs/toolkit";
import genreSlice from "./genre-slice/genre-slice";
import movieListSlice from "./movie-list-slice/movie-list-slice";

const rootReducer = combineReducers({
	genre: genreSlice,
	movieList: movieListSlice,
});

export default rootReducer;
