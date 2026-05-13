function processIMDB(url, apiKey) {
  const imdbId = extractIMDBId(url);
  if (!imdbId) throw new Error("Invalid IMDB URL");

  const apiUrl = "https://www.omdbapi.com/?i=" + imdbId + "&plot=short&r=json&apikey=" + apiKey;

  const res = UrlFetchApp.fetch(apiUrl, {
    muteHttpExceptions: true
  });

  const data = JSON.parse(res.getContentText());

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  const title = data.Title + " (" + data.Year + ")";

  const meta =
    data.imdbRating +
    " | " +
    data.Poster;

  return { title, meta };
}

function extractIMDBId(url) {
  const match = url.match(/title\/(tt\d+)/i);
  return match ? match[1] : null;
}