export function configureRatings(inputRatings) {
  const outputRatings = [];
  for (const entry of inputRatings) {
    if (entry.Source !== "Metacritic") {
      if (entry.Source === "Internet Movie Database") {
        outputRatings.push({
          source: "IMDB",
          value: entry.Value.slice(0, 3),
          NumeredValue: Number(entry.Value.slice(0, 3)),
        });
      } else if (entry.Source === "TMDB") {
        outputRatings.push({
          source: "TMDB",
          value: entry.Value.slice(0, 3),
          NumeredValue: Number(entry.Value.slice(0, 3)),
        });
      } else if (entry.Source === "Rotten Tomatoes") {
        outputRatings.push({
          source: entry.Source,
          value: entry.Value,
          NumeredValue: Number(entry.Value.slice(0, 2)) / 10,
        });
      } else outputRatings.push({ source: entry.Source, value: entry.Value });
    }
  }
  return outputRatings;
}

export function calculateAveraageRating(arr) {
  const filteredArr = arr.filter((el) => Boolean(el.NumeredValue) === true);
  console.log(filteredArr);
  const sum = filteredArr.reduce((acc, cur) => acc + cur.NumeredValue, 0);
  console.log(sum);
  return (sum / filteredArr.length).toFixed(1);
}
