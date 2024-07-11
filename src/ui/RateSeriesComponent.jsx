import StarRating from "./StarRating";
export default function RateSeriesComponent({ series, setUserRating }) {
  return (
    <div className="flex h-96 w-screen items-center justify-center">
      <StarRating series={series} setUserRating={setUserRating} />
    </div>
  );
}
