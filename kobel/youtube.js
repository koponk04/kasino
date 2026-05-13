function processYoutube(url, apiKey) {
  const videoId = extractYoutubeId(url);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const apiUrl =
    "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
    videoId +
    "&key=" +
    apiKey;

  const res = UrlFetchApp.fetch(apiUrl);
  const data = JSON.parse(res.getContentText());

  if (!data.items || !data.items.length) {
    throw new Error("Video not found");
  }

  const snippet = data.items[0].snippet;

  const title = snippet.title;
  const meta =
    snippet.channelTitle +
    " | " +
    (snippet.thumbnails?.high?.url || "");

  return { title, meta };
}

function extractYoutubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}