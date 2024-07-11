import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { ModalContext } from "./Modal";
// const containerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "16px",
// };

// const starContainerStyle = {
//   display: "flex",
//   gap: "0.25rem",
// };

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  series,
  setUserRating,

  maxRating = 10,
  color = "#fcc419",
  messages = [],
  defaultRating = 0,
}) {
  const { close } = useContext(ModalContext);
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const [ratedMovies, setRatedMovies] = useLocalStorageState([], "ratedMovies");
  function handleRating(rating) {
    setRating(rating);
  }
  console.log(ratedMovies);
  function handleRateMovie() {
    setRatedMovies([...ratedMovies, { title: series, userRating: rating }]);
    setUserRating(rating);
    close();
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3>{series}</h3>
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
          />
        ))}
      </div>
      <div>
        <button
          disabled={tempRating === 0}
          onClick={handleRateMovie}
          className="flex w-48 cursor-pointer items-center gap-3 rounded-md border border-primary px-3 py-2 tracking-wider transition-all duration-300 hover:bg-lightblack"
        >
          <span className="flex w-3/4 items-center justify-center gap-2">
            <span className=" text-gray-100">Rate</span>
            <FaStar className="text-primary" />
          </span>
          <span className="w-1/4 text-primary">
            {messages.length === maxRating
              ? messages[tempRating ? tempRating - 1 : rating - 1]
              : tempRating || rating || ""}
          </span>
        </button>
      </div>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color }) {
  /*
  const starStyle = {
    // width: `${size}px`,
    // height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  */

  return (
    <span
      role="button"
      className="h-4 w-4 xs:h-8 xs:w-8 "
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR



*/
