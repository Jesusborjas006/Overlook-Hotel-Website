function fetchRequest(endpoint) {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`).then((response) =>
    response.json()
  );
}

function storedPromises() {
  const customerDataAPI = fetchRequest("customers");
  const bookingsDataAPI = fetchRequest("bookings");
  const roomsDataAPI = fetchRequest("rooms");

  return Promise.all([customerDataAPI, bookingsDataAPI, roomsDataAPI]);
}

export default storedPromises;
