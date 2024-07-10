import "./movie-card.css";

type MovieCardProps = {
	title: string;
	rating: number;
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
			<h6>{Number(rating)?.toFixed(1)}</h6>
		</div>
	);
};

export default MovieCard;
