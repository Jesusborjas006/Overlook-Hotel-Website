/* eslint-disable max-len */
export default function displayMap() {
  // LeafLit Library
  let map = L.map("map").setView([34.02488, -118.476914], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([34.02488, -118.476914]).addTo(map);
  marker.bindPopup("<b>Overlook Hotel</b>").openPopup();
}
