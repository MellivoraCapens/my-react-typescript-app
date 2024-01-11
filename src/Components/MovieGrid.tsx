import "../App.css";
import React, { useEffect, useState } from "react";
import MovieDetail from "./MovieDetail";

interface movieProps {
  params: {
    genre: string;
    year: string;
  };
}

interface movieArray {
  page: number;
  results: [
    id: string,
    original_title: string,
    overview: string,
    poster_path: string
  ];
  total_pages: number;
}

const MovieGrid: React.FC<movieProps> = (movies) => {
  const genre = movies.params.genre;
  const year = movies.params.year;

  const [movieList, setMovielist] = useState<movieArray>();
  const [page, setPage] = useState(1);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>();
  const [selectedMovieId, setSelectedMovieId] = useState<string>();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_AUTH,
    },
  };

  const fetchData = async () => {
    try {
      let url: string = `${process.env.REACT_APP_TMDB_URL}&page=${page}&sort_by=popularity.desc`;

      if (genre) url += `&with_genres=${genre}`;
      if (year) url += `&year=${year}`;

      const response = await fetch(url, options);
      const data = await response.json();
      setMovielist(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedMovieIndex !== undefined && selectedMovieIndex !== null) {
      const selectedMovieData = movieList?.results[selectedMovieIndex] as {
        id?: string;
      };
      setSelectedMovieId(selectedMovieData.id);
    }
  }, [selectedMovieIndex]);

  useEffect(() => {
    if (page > 0) {
      fetchData();
      setPage(1);
    }
  }, [genre, year]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(+e.target.value);
  };

  return (
    <div>
      <button
        onClick={() => {
          if (page > 1) {
            setPage(() => page - 1);
            fetchData();
          }
        }}
      >
        -
      </button>
      {movieList ? (
        <input
          onChange={handleChange}
          type="range"
          min={1}
          max={movieList?.total_pages}
          value={page}
          onMouseLeave={fetchData}
        />
      ) : null}
      <button
        onClick={() => {
          if (!(page === movieList?.total_pages)) {
            setPage(() => page + 1);
            fetchData();
          }
        }}
      >
        +
      </button>
      <p>
        {page}/{movieList?.total_pages}
      </p>
      <div className="movie-grid">
        {movieList?.results.map((result: any) => (
          <div
            key={result.id}
            onClick={() => {
              setSelectedMovieIndex(movieList.results.indexOf(result));
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
              alt=""
            />
            <h4>{result.original_title}</h4>
            <br />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          if (page > 1) {
            setPage(() => page - 1);
            fetchData();
          }
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          if (!(page === movieList?.total_pages)) {
            setPage(() => page + 1);
            fetchData();
          }
        }}
      >
        +
      </button>
      {selectedMovieIndex !== undefined && selectedMovieIndex !== null ? (
        <div className="movie-detail">
          <span onClick={() => setSelectedMovieIndex(undefined)}>&times;</span>
          <span
            onClick={() => {
              if (selectedMovieIndex > 0) {
                setSelectedMovieIndex(selectedMovieIndex - 1);
              }
            }}
            className="left"
          >
            {"<"}
          </span>
          <span
            onClick={() => {
              if (selectedMovieIndex < 20) {
                setSelectedMovieIndex(selectedMovieIndex + 1);
              }
            }}
            className="right"
          >
            {">"}
          </span>
          <div className="movie">
            <MovieDetail id={selectedMovieId || "0"} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieGrid;
