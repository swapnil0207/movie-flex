import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieList } from "../../thunk/movie-list-thunk/movie-list-thunk";

const initialState: any = { movies: [] };

const movieListSlice = createSlice({
	name: "movieList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder?.addCase(fetchMovieList?.fulfilled, (state, action) => {
			return {
				...state,
				movies: action?.payload?.reset
					? [...new Set([...action?.payload?.list])]?.sort((a: any, b: any) => {
							return (
								new Date(a?.release_date).getTime() -
								new Date(b?.release_date).getTime()
							);
					  })
					: [...new Set([...state?.movies, ...action?.payload?.list])]?.sort(
							(a: any, b: any) => {
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
