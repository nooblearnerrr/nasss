// your_script.js
document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

function loadData() {
  fetch('https://spreadsheets.google.com/feeds/list/10gXQcX20sWC6EFxdaOZX4wbmFB860Xw2A1j8qfx2a4I/1/public/values?alt=json')
    .then(response => response.json())
    .then(data => {
      const itemsList = document.getElementById("items-list");
      itemsList.innerHTML = "";
      const entries = data.feed.entry;

      if (entries) {
        entries.forEach((entry, index) => {
          const item = entry.gsx$item.$t;
          const li = document.createElement("li");
          li.textContent = `${index + 1}. ${item}`;
          itemsList.appendChild(li);
        });
      }
    });
}

function addItem() {
  const itemInput = document.getElementById("item-input");
  const newItem = itemInput.value.trim();

  if (newItem !== "") {
    const newRow = encodeURIComponent(`item=${newItem}`);
    const sheetUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfkCIHL-e0Thw54gVdJxhxZlQZ4F5wyNYahAGChTNvMIDQ5CA/formResponse';
    fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: newRow,
    })
      .then(() => {
        itemInput.value = "";
        loadData();
      });
  }
}
