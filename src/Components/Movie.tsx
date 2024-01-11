import React, { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";

interface genreProps {
  id: number;
  name: string;
}

const Movie: React.FC = () => {
  const initialGenreYear = {
    genre: "",
    year: "",
  };

  const [genres, setGenres] = useState(Array<genreProps>);
  const [yearAll, setYearAll] = useState<Array<number>>([]);
  const [genreYear, setGenreYear] = useState(initialGenreYear);
  const [selectedGenreYear, setSelectedGenreYear] = useState(initialGenreYear);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_AUTH,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const years: Array<number> = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      years.push(i);
    }
    setYearAll(years);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedGenreYear(genreYear);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGenreYear((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={handleChange} name="year" id="year">
          <option value="">-Year-</option>
          {yearAll.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
        <select onChange={handleChange} name="genre" id="genre">
          <option value="">-Genre-</option>
          {genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <MovieGrid params={selectedGenreYear} />
    </div>
  );
};

export default Movie;
