// import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getMovie } from "../services/apiMovies";
export async function loader({ params }) {
  const movie = await getMovie(params.id);
  return movie;
}
export default function MoviePage() {
  const movie = useLoaderData();
  console.log(movie);
  const {
    actors,
    director,
    genre,
    language,
    metascore,
    rated,
    ratings,
    runtime,
    title,
    overview,
    writer,
    year,
    homepage,
    imdbrating,
    imdbvotes,
    poster,
    mtdbrating,
    mtdbvotes,
  } = movie;
  console.log(
    actors,
    director,
    genre,
    language,
    metascore,
    rated,
    ratings,
    runtime,
    title,
    overview,
    writer,
    year,
    homepage,
    imdbrating,
    imdbvotes,
    poster,
    mtdbrating,
    mtdbvotes,
  );
  return (
    <div className="grid gap-4 ">
      <h1 className="">{title}</h1>
      <div className="flex flex-wrap gap-1 gap-y-2">
        <div className="border-e-1 border-e px-2 py-0  ">Movie</div>
        <div className="border-e-1 border-e px-2 py-0  ">{year}</div>
        <div className=" px-2 py-0  ">{language}</div>
      </div>
      <div className="grid xs:grid-cols-2">
        <div className="">
          <img src={`https://image.tmdb.org/t/p/w342/${poster}`} className="aspect-4/3  max-h-full" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
