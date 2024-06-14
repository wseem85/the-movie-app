import axios from "axios";
import { KEY } from "../utils/variables";
import { omdbKEY } from "../utils/variables";
export async function getMovie(movieId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&videos=true`,
    {
      params: {
        videos: true,
      },
    },
  );

  const { data: tmdbData } = res;
  // console.log(tmdbData);
  const imdbId = tmdbData.imdb_id;
  const omdbRes = await axios.get(
    `http://www.omdbapi.com/?apikey=${omdbKEY}&i=${imdbId}`,
  );
  const { data: omdbData } = omdbRes;
  // console.log(imdbId);
  console.log(tmdbData);

  const movie = {
    actors: omdbData.Actors,
    director: omdbData.Director,
    genre: omdbData.Genre,
    language: omdbData.Language,
    metascore: omdbData.Metascore,
    rated: omdbData.Rated,
    ratings: omdbData.Ratings,
    runtime: omdbData.Runtime,
    title: omdbData.Title,
    overview: tmdbData.overview,
    writer: omdbData.Writer,
    year: omdbData.Year,
    homepage: tmdbData.homepage,
    imdbrating: omdbData.imdbRating,
    imdbvotes: omdbData.imdbVotes,
    poster: tmdbData.poster_path,
    mtdbrating: tmdbData.vote_average,
    mtdbvotes: tmdbData.vote_count,
  };

  return movie;
}

export async function getSeries(movieId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/${movieId}?api_key=${KEY}&append_to_response=seasons,credits,videos`,
    {
      params: {
        videos: true,
      },
    },
  );

  const { data: tmdbData } = res;
  console.log(tmdbData);
  // seasons information
  const { seasons } = tmdbData;

  const omdbRes = await axios.get(
    `http://www.omdbapi.com/?apikey=${omdbKEY}&t=${tmdbData.name}`,
  );
  const { data: omdbData } = omdbRes;
  // console.log(imdbId);
  console.log(omdbData);

  const finalRatingArr = [
    ...omdbData.Ratings,
    { Source: "Metascore", Value: `${omdbData.Metascore}` },
    { Source: "TMDB", Value: `${tmdbData.vote_average}` },
  ];

  const series = {
    id: tmdbData.id,
    actors: omdbData.Actors,
    director: omdbData.Director,
    overview: tmdbData.overview,
    genre: omdbData.Genre,
    language: omdbData.Language,
    metascore: omdbData.Metascore,
    rated: omdbData.Rated,
    ratings: finalRatingArr,
    runtime: omdbData.Runtime,
    title: omdbData.Title,
    writer: omdbData.Writer,
    year: omdbData.Year,
    homepage: tmdbData.homepage,

    poster: tmdbData.poster_path,

    numseasons: tmdbData.number_of_seasons,
    numepisods: tmdbData.number_of_episodes,
    seasons: seasons,
    awards: omdbData.Awards,
  };
  console.log(series);
  return series;
}
