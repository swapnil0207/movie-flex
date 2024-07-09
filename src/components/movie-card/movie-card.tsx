import "./movie-card.css";

type MovieCardProps = {
	title: string;
	rating: string;
	imageSrc: string;
};

const MovieCard = ({ title, rating, imageSrc }: MovieCardProps) => {
	return (
		<div className="card-container">
			<div className="card-image">
				<img
					src={"https://image.tmdb.org/t/p/w500" + imageSrc}
					alt="Movie Poster"
				/>
			</div>
			<h3 title={title}>
				{/* {title?.slice(0, 15)}
				{title?.length > 15 ? "..." : ""} */}
				{title}
			</h3>
			<h6>{rating}</h6>
		</div>
	);
};

export default MovieCard;