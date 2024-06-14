import MovieRow from "./MovieRow";
export default function MoviesList({ movies }) {
  return (
    <div className="mt-6 flex flex-col gap-7 ">
      {movies.map((movie) => (
        <MovieRow movie={movie} key={movie.Title} />
      ))}
    </div>
  );
}
