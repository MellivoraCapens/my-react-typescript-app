import "../App.css";
import React, { useEffect, useState } from "react";

interface movieDetailProps {
  id: string;
}
interface movie {
  original_title: string;
  poster_path: string;
  overview: string;
}

const MovieDetail: React.FC<movieDetailProps> = (movieId) => {
  const [movie, setMovie] = useState<movie>();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_AUTH,
    },
  };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let url = `https://api.themoviedb.org/3/movie/${movieId.id}?language=en-US`;
        const response = await fetch(url, options);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="single-movie">
      <img src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`} />
      <h2>{movie?.original_title}</h2>
      <p>{movie?.overview}</p>
    </div>
  );
};

export default MovieDetail;
