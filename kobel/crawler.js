function runCrawler() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("bookmarker");
  const values = sheet.getDataRange().getValues();
  const configMap = getCrawlerConfigMap();

  for (let i = 2; i < values.length; i++) {
    const row = values[i];

    const status = row[7];
    if (status !== "Queue") continue;

    const url = row[2];
    const crawlerRaw = row[3];

    const crawler = (crawlerRaw || "").toString().trim();

    if (!url || !crawler) {
      setStatus(sheet, i + 1, "Failed");
      continue;
    }

    const config = configMap[crawler];

    if (!config) {
      Logger.log("Unknown crawler: [" + crawler + "]");
      setStatus(sheet, i + 1, "Failed");
      continue;
    }

    try {
      processRow(sheet, i, row, config);

      setUpdatedAt(sheet, i + 1);
      setStatus(sheet, i + 1, "Updated");

    } catch (e) {
      Logger.log(e);
      setStatus(sheet, i + 1, "Failed");
    }
  }
}

function processRow(sheet, i, row, config) {
  const url = row[2];

  switch (config.codename) {

    case "github_pages": {
      const result = processGithubRepo(url, config.apiKey);

      sheet.getRange(i + 1, 2).setValue(result.title);
      sheet.getRange(i + 1, 10).setValue(result.title);
      sheet.getRange(i + 1, 11).setValue(result.meta);

      return result;
    }

    case "youtube": {
      const result = processYoutube(url, config.apiKey);

      sheet.getRange(i + 1, 2).setValue(result.title);
      sheet.getRange(i + 1, 10).setValue(result.title);
      sheet.getRange(i + 1, 11).setValue(result.meta);

      return result;
    }

    case "imdb": {
      const result = processIMDB(url, config.apiKey);

      sheet.getRange(i + 1, 2).setValue(result.title);
      sheet.getRange(i + 1, 10).setValue(result.title);
      sheet.getRange(i + 1, 11).setValue(result.meta);

      return result;
    }

    default:
      throw new Error("Unsupported crawler: " + config.codename);
  }
}