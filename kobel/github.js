function processGithubRepo(url, token) {
  const repoPath = extractRepoPath(url);
  if (!repoPath) throw new Error("Invalid GitHub URL");

  const apiUrl = "https://api.github.com/repos/" + repoPath;

  const res = UrlFetchApp.fetch(apiUrl, {
    muteHttpExceptions: true,
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "Kobel-Crawler",
      "Authorization": token ? ("Bearer " + token) : ""
    }
  });

  const data = JSON.parse(res.getContentText());

  const title = data.full_name + ": " + (data.description || "");
  const meta = data.owner ? data.owner.avatar_url : "";

  return { title, meta };
}

function extractRepoPath(url) {
  const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/i);
  return match ? match[1].replace(/\/$/, "") : null;
}