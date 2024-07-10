import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGenre = createAsyncThunk("fetchGenre", async () => {
	const apiResponse = await axios.get(
		"https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en"
	);

	const data = await apiResponse?.data;

	console.log("in thunk", data);
	return data;
});
