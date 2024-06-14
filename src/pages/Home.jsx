import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MoviesList from "../ui/MoviesList";
import Logo from "../ui/Logo";

export default function Home() {
  const [query, setQuery] = useState("");
  const { allResults, isLoading, errorMovies, errorSeries } = useMovies(query);

  return (
    <div>
      <Logo />
      <h3 className="mb-6 text-center">
        start by Searching for a Movie , Tv Series ..
      </h3>

      <input
        className="text-md w-full border-none px-5 py-2  text-lightblack outline-none"
        type="search"
        placeholder="Name of Movie / Tv Series"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p>Loading ...</p>}
      {errorMovies || (errorSeries && <p>Somethinf went wrong</p>)}
      {!isLoading && !errorMovies && !errorSeries && (
        <MoviesList movies={allResults} />
      )}
    </div>
  );
}
