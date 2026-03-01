const STORAGE_KEY = 'cardCraftRecords';

export function getRecords() {
  const recordsJson = localStorage.getItem(STORAGE_KEY);
  return recordsJson ? JSON.parse(recordsJson) : {};
}

export function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
