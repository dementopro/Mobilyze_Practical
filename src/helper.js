export const arrayToCSV = (array) => {
  const header = Object.keys(array[0]).join(",");
  const rows = array.map((obj) => Object.values(obj).join(","));
  return `${header}\n${rows.join("\n")}`;
};

export const CSVToArray = (csvString) => {
  const rows = csvString.split("\n");
  const headers = rows[0].split(",");
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(",");
    if (row.length !== headers.length) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const value = row[j].trim();
      if (!isNaN(value)) {
        obj[headers[j]] = parseFloat(value);
      } else {
        obj[headers[j]] = value;
      }
    }
    data.push(obj);
  }
  return data;
};

export const handleExport = (markers) => {
  const csvContent = arrayToCSV(markers);
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "saved_location.csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const handleImport = (file, setSelectedFiles, setMarkers) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const contents = e.target.result;
    const importedData = CSVToArray(contents).flat();

    const locations = JSON.parse(window.localStorage.getItem("markers"));
    const updatedLocations =
      locations?.length > 0
        ? [...locations, ...importedData]
        : [...importedData];
    window.localStorage.setItem(
      "markers",
      JSON.stringify(updatedLocations.flat())
    );
    setMarkers(updatedLocations.flat());
  };
  reader.readAsText(file);
};
