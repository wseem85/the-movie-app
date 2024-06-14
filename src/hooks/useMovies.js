import axios from "axios";
import { useState, useEffect } from "react";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzcxZTQyYjExYzhjYTUzODA3NGFjZWI1MmU4YjdlNyIsInN1YiI6IjY2NGI3ZWFkYzY0M2MzNDJlMDhmYWIwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j9QVnFJ7p7b91mWRYokxcfoAYJGQ__Ua1LUA2ozXXSQ",
//   },
// };
// const KEY = "68b02a99";
const KEY = "bc71e42b11c8ca538074aceb52e8b7e7";
const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}`;
const apiSearchSeriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${KEY}`;
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);
  const [errorMovies, setErrorMovies] = useState("");
  const [errorSeries, setErrorSeries] = useState("");
  const isLoading = isLoadingMovies || isLoadingSeries;
  useEffect(
    function () {
      // callback?.();

      // const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoadingMovies(true);
          setErrorMovies("");

          // const res = await fetch(
          //   `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          //   { signal: controller.signal },
          // );
          const res = await axios.get(apiSearchUrl, {
            params: {
              query: query,
              include_adult: true,
            },
          });
          // console.log(res);
          // if (!res.ok)
          //   throw new Error("Something went wrong with fetching movies");

          const { results } = res.data;
          // console.log(results);
          // if (data.Response === "False") throw new Error("Movie not found");
          for (const item of results) item.mediaType = "Movie";
          setMovies(results);
          setErrorMovies("");
        } catch (err) {
          console.log(err.message);
          setErrorMovies(err.message);
        } finally {
          setIsLoadingMovies(false);
        }
      }

      async function fetchSeries() {
        try {
          setIsLoadingSeries(true);
          setErrorSeries("");

          const res = await axios.get(apiSearchSeriesUrl, {
            params: {
              query: query,
              include_adult: true,
            },
          });

          const { results } = res.data;
          for (const item of results) item.mediaType = "Tv series";
          // console.log(results);
          // if (data.Response === "False") throw new Error("Movie not found");

          setSeries(results);
          setErrorSeries("");
        } catch (err) {
          console.log(err.message);
          setErrorSeries(err.message);
        } finally {
          setIsLoadingSeries(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setSeries([]);
        setErrorMovies("");
        setErrorSeries("");
        return;
      }

      fetchMovies();
      fetchSeries();
    },
    [query],
  );
  // let allResults = [];
  // for (let i = 0; i < movies.length; i++) {
  //   allResults.push(movies[i]);
  //   allResults.push(series[i]);
  // }
  const allResults = [...movies, ...series].sort(
    (a, b) => b.popularity - a.popularity,
  );
  console.log(allResults);
  return { allResults, isLoading, errorMovies, errorSeries };
}
