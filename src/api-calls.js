function fetchRequest(endpoint) {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`).then((response) =>
    response.json()
  );
}

function storedPromises() {
  const customerDataAPI = fetchRequest("customers");
  const roomsDataAPI = fetchRequest("rooms");
  const bookingsDataAPI = fetchRequest("bookings")

  return Promise.all([customerDataAPI, roomsDataAPI, bookingsDataAPI])
}

export default storedPromises;
