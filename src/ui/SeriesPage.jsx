// import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getSeries } from "../services/apiMovies";
import { configureRatings, calculateAveraageRating } from "../utils/helpers";
// import { useEffect, useState } from "react";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiBookmarkPlus, CiBookmarkRemove } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import Modal from "./Modal";
import RateSeriesComponent from "./RateSeriesComponent";
import { useState } from "react";
export async function loader({ params }) {
  const series = await getSeries(params.id);
  return series;
}
export default function SeriesPage() {
  let series = useLoaderData();
  const [ratedMovies, setRatedMovies] = useLocalStorageState([], "ratedMovies");

  console.log(series);

  const { ratings: inputRatings } = series;
  const output = configureRatings(inputRatings);
  series = { ...series, ratings: output };
  const {
    actors,
    // id,
    overview,
    genre,
    language,
    rated,
    ratings,
    runtime,
    title,
    writer,
    year,
    homepage,
    poster,
    numseasons,
    numepisods,
    seasons,
    awards,
  } = series;
  // const [isRated, setIsRated] = useState(
  //   ratedMovies?.find((el) => el.title === title),
  // );
  const [userRating, setUserRating] = useState(
    ratedMovies?.find((el) => el.title === title)?.userRating,
  );
  console.log(homepage, seasons);
  function handleRemoveFromWatched() {
    const newRatedMovies = ratedMovies.filter((el) => el.title !== title);

    setRatedMovies(newRatedMovies);
    // setIsRated(false);
    setUserRating(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-80 xxs:text-90 xs:text-100">
        <div className="flex w-full flex-col items-center justify-between gap-x-8 gap-y-3 xs:flex-row">
          <h1 className=" text-primary">{title}</h1>
          <span className="border-1 mt-1 inline-block w-fit rounded-lg  bg-primary px-1 py-1 text-sm text-lightblack">
            {numseasons === 1 ? "Miniseries" : "Tv Series"}
          </span>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:justify-start  sm:gap-12">
          <div>
            <span>Runtime:</span>
            <span>
              {numseasons === 1 ? `${runtime}` : `${runtime}/episode`}
            </span>
          </div>
          <div className="flex  gap-4 ">
            <div className="  py-0  ">{year}</div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:justify-start  sm:gap-12">
          <div className="flex gap-4">
            <span>
              {numseasons === 1 ? "1 Season" : `${numseasons} Seasons`}{" "}
            </span>
            <span> {numepisods} Episodes</span>
          </div>
          <div className="flex gap-4">
            <span>{genre}</span>
          </div>
        </div>
      </div>
      <div className=" justify-content-center grid items-center  gap-x-6  gap-y-2 space-y-6 px-2 xs:grid xs:gap-6  md:grid-cols-[34%_63%]">
        <div className=" flex max-w-full items-center justify-center sm:justify-start">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            className="m-auto  max-w-full rounded-lg object-cover shadow-sm shadow-gray-100"
          />
        </div>

        <div className="min-w-full space-y-4 place-self-center lg:space-y-7 ">
          {awards !== "N/A" && (
            <div className=" bg-primary px-2   text-lightblack">
              <p className="max-w-full ">{awards}</p>
            </div>
          )}

          <div className="grid gap-y-4 border-b  border-b-gray-300 pb-4 text-sm xxs:gap-x-4 xs:grid-cols-2 xs:text-lg sm:grid-cols-1 md:grid-cols-2  ">
            <h3>Ratings:</h3>
            <div></div>
            {ratings.map((rating) => (
              <div
                key={rating.source}
                className="flex items-center justify-center justify-between gap-4 border border-gray-300 p-1 text-center"
              >
                <h4>{rating.source}</h4>
                <p className="tracking-wider">{rating.value}</p>
              </div>
            ))}
          </div>
          <div className="mb-2 flex items-center justify-between  border-b border-b-gray-300  p-1 pb-3">
            <div className="flex flex-col items-center gap-1 ">
              <h3>Average Rating</h3>
              <p className="text-md px-4 py-2 text-[120%] font-bold tracking-wider">
                {calculateAveraageRating(ratings)}{" "}
                <span className="text-[80%] font-light">/10</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3>Your Rating</h3>
              <Modal>
                <Modal.Open opens="rate-movie">
                  {userRating ? (
                    <div className="flex items-center gap-2  px-4 py-3">
                      <FaStar className="text-primary" />
                      <span className="font-bold">
                        {userRating} <span className="font-normal">/10</span>
                      </span>
                    </div>
                  ) : (
                    <button className=" border-1 flex items-center gap-3 rounded-lg border border-primary px-4 py-2 tracking-wider transition-all duration-300 hover:bg-extralightblack">
                      <FaStar className="text-primary" />
                      <span> Rate</span>
                    </button>
                  )}
                </Modal.Open>
                <Modal.Window name="rate-movie">
                  <RateSeriesComponent
                    series={title}
                    setUserRating={setUserRating}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
          {userRating ? (
            <div className="flex justify-center">
              <button
                onClick={handleRemoveFromWatched}
                className=" border-1 flex h-[3rem] items-center justify-center gap-3 rounded-lg border border-primary px-3 py-2 transition-all duration-300 hover:bg-extralightblack"
              >
                <CiBookmarkRemove className="h-8 w-8 leading-[3rem] text-primary" />
                <span>Remove from Watched </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-3 xs:flex-row md:flex-col lg:flex-row">
              <button className=" border-1 flex h-[3rem] items-center justify-center gap-3 rounded-lg border border-primary px-3 py-2 transition-all duration-300 hover:bg-extralightblack">
                <CiBookmarkPlus className="h-8 w-8 leading-[3rem] text-primary" />
                <span>Add to Watchlist </span>
              </button>
              <Modal>
                <Modal.Open opens="rate-movie">
                  <button className=" border-1 flex h-[3rem]  items-center justify-center gap-3 rounded-lg border border-primary px-3 py-2 transition-all duration-300 hover:bg-extralightblack">
                    <CiBookmarkCheck className="h-8 w-8 leading-[3rem] text-primary" />
                    <span>Mark as watched</span>
                  </button>
                </Modal.Open>

                <Modal.Window name="rate-movie">
                  <RateSeriesComponent
                    series={title}
                    setUserRating={setUserRating}
                  />
                </Modal.Window>
              </Modal>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-y-5   text-70 xs:text-80 sm:text-90 md:text-100 ">
        <div className="flex items-start gap-4">
          <h4 className="  text-primary">Rated </h4>
          <span>{rated}</span>
        </div>

        <div className="flex items-start gap-6 ">
          <h4 className=" text-primary">Creator</h4> <p>{writer} </p>
        </div>
        <div className="flex  gap-6">
          <h4 className=" text-primary">Stars</h4> <p>{actors}</p>
        </div>

        <div className="flex items-start gap-6">
          <h4 className="text-primary">Languages</h4>{" "}
          <p className=" py-0  ">{language}</p>
        </div>
        <div className="min-w-full grow">
          <h3 className="text-primary">Overview</h3> {overview}
        </div>
      </div>
    </div>
  );
}
