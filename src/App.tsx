import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import GenreContainer from "./containers/genre-container/genre-container";
import MoviesContainer from "./containers/movies-container/movies-container";
import { debounce } from "./utils/utils";

function App() {
	const [year, setYear] = useState(2012);

	const [activeGenre, setActiveGenre] = useState(-1);

	const handleScroll = useCallback(
		debounce(() => {
			const scrollTop = window.scrollY;
			const scrollHeight = document.documentElement.scrollHeight;
			const clientHeight = document.documentElement.clientHeight;

			if (scrollTop === 0) {
				setYear((prevYear) => prevYear - 1);
			} else if (scrollTop + clientHeight >= scrollHeight) {
				setYear((prevYear) => prevYear + 1);
			}
		}, 200),
		[]
	);

	const handleWheel = useCallback(
		debounce((event: any) => {
			const scrollTop = window.scrollY;

			if (scrollTop === 0 && event.deltaY < 0) {
				setYear((prevYear) => prevYear - 1);
			} else if (
				scrollTop + window.innerHeight ===
					document.documentElement.scrollHeight &&
				event.deltaY > 0
			) {
				setYear((prevYear) => prevYear + 1);
			}
		}, 200),
		[]
	);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("wheel", handleWheel);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("wheel", handleWheel);
		};
	}, [handleScroll, handleWheel]);

	console.log("year", year);

	return (
		<Provider store={store}>
			<div>
				<GenreContainer
					year={year}
					activeGenre={activeGenre}
					setActiveGenre={setActiveGenre}
				/>
				<MoviesContainer year={year} activeGenre={activeGenre} />
			</div>
		</Provider>
	);
}

export default App;
