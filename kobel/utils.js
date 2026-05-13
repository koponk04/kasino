function setStatus(sheet, rowIndex, status) {
  sheet.getRange(rowIndex, 8).setValue(status);
}

function setUpdatedAt(sheet, rowIndex) {
  sheet.getRange(rowIndex, 7).setValue(new Date());
}