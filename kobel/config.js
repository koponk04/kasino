function getCrawlerConfigMap() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("crawler_configuration");
  const values = sheet.getDataRange().getValues();

  const map = {};

  for (let i = 1; i < values.length; i++) {
    const codename = (values[i][0] || "").toString().trim();
    const name = values[i][1];
    const apiKey = values[i][2];

    if (!codename) continue;

    map[codename] = {
      codename,
      name,
      apiKey
    };
  }

  return map;
}