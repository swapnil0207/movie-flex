import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchMovieList } from "../../thunk/movie-list-thunk/movie-list-thunk";

const MoviesContainer = ({ year, activeGenre }: any) => {
	const dispatch = useAppDispatch();

	const [movieList, setMovieList] = useState([]);

	const movieListStore = useAppSelector((state) => state?.movieList?.movies);

	useEffect(() => {
		setMovieList(movieListStore);
	}, [movieListStore]);

	useEffect(() => {
		const callApi = async () => {
			await dispatch(fetchMovieList({ year, genreId: activeGenre }));
		};
		if (year) {
			callApi();
		}
	}, [dispatch, year]);

	console.log(movieList);

	return (
		<div className="container">
			{movieList?.map((movieItem: any, index: number, arr: any) => {
				return (
					<React.Fragment key={index}>
						{new Date(arr?.[index - 1]?.release_date)?.getFullYear() !==
							new Date(arr?.[index]?.release_date)?.getFullYear() && (
							<div
								style={{
									width: "100%",
									fontSize: "18px",
									fontWeight: "bold",
								}}
							>
								{new Date(arr?.[index]?.release_date)?.getFullYear()}
							</div>
						)}
						<MovieCard
							title={movieItem?.title}
							rating={movieItem?.vote_average}
							imageSrc={movieItem?.poster_path}
						/>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default MoviesContainer;
