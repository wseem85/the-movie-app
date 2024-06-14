import { Link } from "react-router-dom";

const genreIdToText = function (genreId, type) {
  if (type === "Movie") {
    switch (genreId) {
      case 28:
        return "Action";
      case 12:
        return "Adventure";
      case 16:
        return "Animation";

      case 35:
        return "Comedy";

      case 80:
        return "Crime";

      case 99:
        return "Documentary";
      case 18:
        return "Drama";
      case 10751:
        return "Family";
      case 14:
        return "Fantasy";
      case 36:
        return "History";
      case 27:
        return "Horror";
      case 10402:
        return "Music";
      case 9648:
        return "Mystery";
      case 10749:
        return "Romance";
      case 878:
        return "Science Fiction";
      case 10770:
        return "TV Movie ";
      case 53:
        return "Thriller";
      case 10752:
        return "War";
      case 37:
        return "Western";
      default:
        return "";
    }
  }
  if (type === "Tv series") {
    switch (genreId) {
      case 10759:
        return "Action & Adventure";
      case 16:
        return "Animation";
      case 35:
        return "Comedy";

      case 80:
        return "Crime";

      case 99:
        return "Documentary";

      case 18:
        return "Drama";

      case 10751:
        return "Family";
      case 10762:
        return "Kids";
      case 9648:
        return "Mystery";
      case 10763:
        return "News";
      case 10764:
        return "Reality";

      case 10765:
        return "Sci-Fi & Fantasy";
      case 10766:
        return "Soap";
      case 10767:
        return "Talk";
      case 10768:
        return "War & Politics";
      case 37:
        return "Western";

      default:
        return "";
    }
  }
};

export default function MovieRow({ movie }) {
  const isMovie = movie.mediaType === "Movie" ? true : false;
  const linkTo = isMovie ? `movie/${movie.id}` : `series/${movie.id}`;
  return (
    <Link to={linkTo}>
      <div className="border-1 flex cursor-pointer flex-row items-center gap-6 border-b pb-2">
        <div className="w-12 min-w-12">
          <img
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            className="max-w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-primary">
            {movie.name || movie.title}
          </p>
          <div className="flex ">
            {movie.genre_ids?.map((genreId) => (
              <p className="mr-2" key={genreId}>
                {genreIdToText(genreId, movie.mediaType)}
              </p>
            ))}
          </div>
          <div className="flex gap-4">
            <p>{movie.mediaType}</p>
            <p>
              {new Date(movie.release_date)?.getFullYear() ||
                new Date(movie.first_air_date)?.getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
