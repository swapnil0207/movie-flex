import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchMovieList } from "../../thunk/movie-list-thunk/movie-list-thunk";
import { IMovieList } from "../../models";

type moviesContainerProps = {
	year: number;
	activeGenre: number;
};

const MoviesContainer = ({ year, activeGenre }: moviesContainerProps) => {
	const dispatch = useAppDispatch();

	const [movieList, setMovieList] = useState<IMovieList[] | []>([]);

	const movieListStore = useAppSelector((state) => state?.movieList?.movies);

	useEffect(() => {
		setMovieList(movieListStore);
	}, [movieListStore]);

	useEffect(() => {
		const callApi = async () => {
			if (
				!movieListStore?.find(
					(item) => new Date(item?.release_date)?.getFullYear() === year
				)
			) {
				await dispatch(
					fetchMovieList({
						year,
						genreId: activeGenre,
						// searchTerm: "fifty+shades",
						// reset: true,
					})
				);
			}
		};
		if (year) {
			callApi();
		}
	}, [dispatch, year]);

	console.log(movieList);

	return (
		<div className="container">
			{movieList?.map((movieItem, index: number, arr) => {
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
