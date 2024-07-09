import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { fetchGenre } from "../../thunk/genre-thunk/genre-thunk";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchMovieList } from "../../thunk/movie-list-thunk/movie-list-thunk";

const GenreContainer = ({ year, activeGenre, setActiveGenre }: any) => {
	const dispatch = useAppDispatch();

	const [isGenreUpdated, setIsGenreUpdated] = useState(false);

	const genreList = useAppSelector((state) => state?.genre?.genre);

	useEffect(() => {
		dispatch(fetchGenre());
	}, []);

	useEffect(() => {
		if (isGenreUpdated) {
			dispatch(fetchMovieList({ year, reset: true, genreId: activeGenre }));
		}
	}, [activeGenre]);

	return (
		<div className="grey-background">
			<img src={Logo} alt="logo"></img>
			<div className="horizontal-scroll">
				<div
					className={"genre-tab" + (activeGenre === -1 ? " active" : "")}
					onClick={() => {
						setActiveGenre(-1);
						setIsGenreUpdated(true);
					}}
				>
					All
				</div>
				{genreList?.genres?.map((genreItem: any, index: number) => {
					return (
						<div
							key={index}
							className={
								"genre-tab" + (activeGenre === genreItem?.id ? " active" : "")
							}
							onClick={() => {
								setActiveGenre(genreItem?.id);
								setIsGenreUpdated(true);
							}}
						>
							{genreItem?.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GenreContainer;
