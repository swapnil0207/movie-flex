import { createSlice } from "@reduxjs/toolkit";
import { fetchGenre } from "../../thunk/genre-thunk/genre-thunk";

const initialState: any = { genre: [] };

const genreSlice = createSlice({
	name: "genreList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder?.addCase(fetchGenre?.fulfilled, (state, action) => {
			return {
				...state,
				genre: action?.payload,
			};
		});
	},
});

export default genreSlice?.reducer;
