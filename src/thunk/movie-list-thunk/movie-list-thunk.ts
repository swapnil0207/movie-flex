import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IParams {
	searchTerm?: string;
	year?: number;
	genreId?: number;
	reset?: boolean;
}

export const fetchMovieList = createAsyncThunk(
	"fetchMovieList",
	async (params: IParams) => {
		const apiResponse = await axios.get(
			params?.searchTerm
				? `https://api.themoviedb.org/3/search/movie?query=${params?.searchTerm}&api_key=2dca580c2a14b55200e784d157207b4d`
				: `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${params?.year}&page=1&vote_count.gte=100` +
						(params?.genreId !== -1 ? `&with_genres=${params?.genreId}` : "")
		);

		const data = await apiResponse?.data;

		return { list: data?.results, reset: params?.reset };
	}
);
