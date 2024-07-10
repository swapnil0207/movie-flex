import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieList } from "../../thunk/movie-list-thunk/movie-list-thunk";
import { MovieListInitialState } from "../../models";

const initialState: MovieListInitialState = { movies: [] };

const movieListSlice = createSlice({
	name: "movieList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder?.addCase(fetchMovieList?.fulfilled, (state, action) => {
			return {
				...state,
				movies: action?.payload?.reset
					? [...new Set([...action?.payload?.list])]?.sort((a, b) => {
							return (
								new Date(a?.release_date).getTime() -
								new Date(b?.release_date).getTime()
							);
					  })
					: [...new Set([...state?.movies, ...action?.payload?.list])]?.sort(
							(a, b) => {
								return (
									new Date(a?.release_date).getTime() -
									new Date(b?.release_date).getTime()
								);
							}
					  ),
			};
		});
	},
});

export default movieListSlice?.reducer;
