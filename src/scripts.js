/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import storedPromises from "./api-calls";
import Customer from "./classes/Customer";
import CustomerRepo from "./classes/CustomerRepo";
import Room from "./classes/Room";
import Booking from "./classes/Booking";
import "./css/styles.css";
import Chart from "chart.js/auto";

// Query Selectors
const homePage = document.querySelector(".home-page");
const roomsPage = document.querySelector(".rooms-page");
const accountPage = document.querySelector(".account-page");
const loginPage = document.querySelector(".login-page");
const navBar = document.querySelector(".navbar");

const homeLink = document.querySelector(".home-link");
const roomsLink = document.querySelector(".rooms-link");
const accountLink = document.querySelector(".account-link");

const bookingCardContainer = document.querySelector(".bookings-card-container");
const customerNameHeading = document.querySelector(".account-heading");
const spendingContainer = document.querySelector(".spending-container");

const roomCardContainer = document.querySelector(".room-card-container");

const allBookingsBtn = document.querySelector(".all-bookings-btn");
const upcomingBookingsBtn = document.querySelector(".upcoming-bookings-btn");
const pastBookingsBtn = document.querySelector(".past-bookings-btn");

const userNameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const formErrorMessage = document.querySelector(".form-error-message");
const loginForm = document.querySelector(".form");

const bookRoomForm = document.querySelector(".book-room-form");
const dateInput = document.querySelector(".date-input");
const roomTypeInput = document.querySelector(".room-type-input");
const roomResults = document.querySelector(".room-results");
const roomSortBtn = document.querySelector(".room-sort-btn");
const roomMessage = document.querySelector(".room-message");

// Global Variables
let allCustomers;
let allRooms;
let allBookings;
let customerRepository;
let aNewRoom;

// Event Listeners
window.addEventListener("load", () => {
  resolvePromises();
});

homeLink.addEventListener("click", () => {
  displayHomePage();
});

roomsLink.addEventListener("click", () => {
  displayRoomsPage();
});

accountLink.addEventListener("click", () => {
  displayAccountPage();
});

allBookingsBtn.addEventListener("click", () => {
  displayAllCustomerBookings();
});

upcomingBookingsBtn.addEventListener("click", () => {
  displayUpcomingCustomerBookings();
});

pastBookingsBtn.addEventListener("click", () => {
  displayPastCustomerBookings();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    userNameInput.value === "customer1" &&
    passwordInput.value === "overlook2023"
  ) {
    loginPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    navBar.classList.remove("hidden");
  } else {
    formErrorMessage.classList.remove("hidden");
    userNameInput.value = "";
    passwordInput.value = "";
  }
});

bookRoomForm.addEventListener("submit", (e) => {
  e.preventDefault(e);
  displayAvailableRooms();
});

roomCardContainer.addEventListener("click", (e) => {
  displayAvailableRooms();
  if (e.target.className === "book-room-btn") {
    aNewRoom = e.target.id;
    postNewBooking(aNewRoom);
    e.target.innerText = "Room Booked";
  }
  return aNewRoom;
});

// Functions
function resolvePromises() {
  storedPromises().then((data) => {
    allCustomers = data[0].customers.map((customer) => new Customer(customer));
    allBookings = data[1].bookings.map((booking) => new Booking(booking));
    allRooms = data[2].rooms.map((room) => new Room(room));
    customerRepository = new CustomerRepo(allCustomers);
    displayAllCustomerBookings();
    displayCustomersName();
    displayTotalCost();
    // displayRoomCards();
    displayAvailableRooms();
    displayChart();
    getFirstYear();
    getSecondYear();
    getThirdYear();
    getFourthYear();
    getChartTotalCost();
  });
}

function postNewBooking(roomNumber) {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify({
      userID: allCustomers[1].id,
      date: dateInput.value.replaceAll("-", "/"),
      roomNumber: Number(roomNumber),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      resolvePromises();
    } else {
      console.log("Error in Post", response);
    }
  });
}

function displayRoomCards() {
  roomCardContainer.innerHTML = "";

  allRooms.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src=${room.getRoomImages()} alt="Room Image">
    <div class="room-text-content">
      <div class="card-cost-container">
      <p class="cost-text"><span class="cost-span">$${room.getRoundedCost()}</span>/night</p>
      <p class="room-number">Room: ${room.number}</p>
      </div>
      <h5 class="room-type-heading">${room.capitalizeRoomType()}</h5>
      <p class="room-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sed?</p>
    <div class="extra-features">
      <p>${room.capitalizeBedSize()} Size Bed</p>
      <p>${room.numBeds} Bed/s</p>
      <p>${room.getBidetInfo()}</p>
    </div>
    <button class="book-room-btn" id="${room.number}">Book Room</button>
    </div>
    </div>
    <hr>
  `;
  });
}

function displayCustomersName() {
  customerNameHeading.innerText = `Welcome Back ${allCustomers[1].getFirstName()}!`;
}

function displayAllCustomerBookings() {
  allBookingsBtn.classList.add("active-bookings-btn");
  upcomingBookingsBtn.classList.remove("active-bookings-btn");
  pastBookingsBtn.classList.remove("active-bookings-btn");
  bookingCardContainer.innerHTML = "";

  let customerAllBookings = allCustomers[1].getCustomerBookings(allBookings);

  customerAllBookings.forEach((book) => {
    bookingCardContainer.innerHTML += `
      <div class="bookings-card">
        <p><span>id:</span> ${book.id}</p>
        <p><span>userID:</span> ${book.userID}</p>
        <p><span>date:</span> ${book.date}</p>
        <p><span>roomNumber:</span> ${book.roomNumber}</p>
      </div>`;
  });
}

function displayUpcomingCustomerBookings() {
  upcomingBookingsBtn.classList.add("active-bookings-btn");
  allBookingsBtn.classList.remove("active-bookings-btn");
  pastBookingsBtn.classList.remove("active-bookings-btn");

  bookingCardContainer.innerHTML = "";

  let customerUpcomingBookings =
    allCustomers[1].getUpcomingBookings(allBookings);
  customerUpcomingBookings.forEach((book) => {
    bookingCardContainer.innerHTML += `
      <div class="bookings-card">
        <p><span>id:</span> ${book.id}</p>
        <p><span>userID:</span> ${book.userID}</p>
        <p><span>date:</span> ${book.date}</p>
        <p><span>roomNumber:</span> ${book.roomNumber}</p>
      </div`;
  });
}

function displayPastCustomerBookings() {
  pastBookingsBtn.classList.add("active-bookings-btn");
  allBookingsBtn.classList.remove("active-bookings-btn");
  upcomingBookingsBtn.classList.remove("active-bookings-btn");

  bookingCardContainer.innerHTML = "";

  let customerPastBookings = allCustomers[1].getPastBookings(allBookings);
  customerPastBookings.forEach((book) => {
    bookingCardContainer.innerHTML += `
      <div class="bookings-card">
        <p><span>id:</span> ${book.id}</p>
        <p><span>userID:</span> ${book.userID}</p>
        <p><span>date:</span> ${book.date}</p>
        <p><span>roomNumber:</span> ${book.roomNumber}</p>
      </div`;
  });
}

function displayHomePage() {
  homeLink.classList.add("active-link");
  accountPage.classList.add("hidden");
  accountLink.classList.remove("active-link");
  roomsLink.classList.remove("active-link");
  homePage.classList.remove("hidden");
  roomsPage.classList.add("hidden");
}

function displayRoomsPage() {
  roomsLink.classList.add("active-link");
  accountPage.classList.add("hidden");
  homePage.classList.add("hidden");
  roomsPage.classList.remove("hidden");
  accountLink.classList.remove("active-link");
  homeLink.classList.remove("active-link");
}

function displayAccountPage() {
  accountLink.classList.add("active-link");
  homePage.classList.add("hidden");
  homeLink.classList.remove("active-link");
  roomsLink.classList.remove("active-link");
  accountPage.classList.remove("hidden");
  roomsPage.classList.add("hidden");
}

function getCustomersTotal() {
  let customerBookings = allCustomers[1]
    .getCustomerBookings(allBookings)
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return customerBookings.includes(room.number);
  });

  let totalCost = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  return Number(totalCost.toFixed(2));
}

function displayTotalCost() {
  spendingContainer.innerHTML = `
    <div class="card">
      <p class="spending-text">Total Spending:<span> $${getChartTotalCost()}</span></p>
    </div>
  `;
}

function filterByDateAvailable() {
  let customersDate = dateInput.value.replaceAll("-", "/");

  const bookedRoomsNumber = allBookings
    .filter((room) => {
      return room.date === customersDate;
    })
    .map((room) => room.roomNumber);

  const bookedRooms = [];
  const notBookedYet = [];
  const getAvailableRooms = allRooms.forEach((room) => {
    if (bookedRoomsNumber.includes(room.number)) {
      bookedRooms.push(room);
    } else {
      notBookedYet.push(room);
    }
    return notBookedYet;
  });
  return notBookedYet;
}

function displayAvailableRooms() {
  roomSortBtn.classList.add("hidden");
  let availableRoomsByDate = filterByDateAvailable();
  let customersRoomType = roomTypeInput.value;

  let specificRoomTypeAvailable = availableRoomsByDate.filter((room) => {
    return room.roomType === customersRoomType;
  });

  if (specificRoomTypeAvailable.length >= 1) {
    roomSortBtn.classList.remove("hidden");
    roomMessage.classList.add("hidden");
  } else {
    roomMessage.classList.remove("hidden");
  }

  roomResults.innerText = `${specificRoomTypeAvailable.length} Results`;
  roomCardContainer.innerHTML = "";

  specificRoomTypeAvailable.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src=${room.getRoomImages()} alt="Room Image">
    <div class="room-text-content">
    <div class="card-cost-container">
      <p class="cost-text"><span class="cost-span">$${room.getRoundedCost()}</span>/night</p>
      <p class="room-number">Room: ${room.number}</p>
      </div>
      <h5 class="room-type-heading">${room.capitalizeRoomType()}</h5>
      <p class="room-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sed?</p>
    <div class="extra-features">
      <p>${room.capitalizeBedSize()} Size Bed</p>
      <p>${room.numBeds} Bed/s</p>
      <p>${room.getBidetInfo()}</p>
    </div>
    <button class="book-room-btn" id="${room.number}">Book Room</button>
    </div>
    </div>
    <hr>
  `;
  });

  return specificRoomTypeAvailable;
}

// LeafLit Library
let map = L.map("map").setView([34.02488, -118.476914], 14);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([34.02488, -118.476914]).addTo(map);
marker.bindPopup("<b>Overlook Hotel</b>").openPopup();

// Chart JS
const ctx = document.getElementById("myChart");

function displayChart() {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Money Spent",
          data: [
            getFirstYear(),
            getSecondYear(),
            getThirdYear(),
            getFourthYear(),
          ],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function getFirstYear() {
  let year2020 = allCustomers[1]
    .getCustomerBookings(allBookings)
    .filter((date) => {
      return date.date.substring(0, 4) === "2020";
    })
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return year2020.includes(room.number);
  });

  let totalCost2020 = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  return totalCost2020;
}

function getSecondYear() {
  let year2021 = allCustomers[1]
    .getCustomerBookings(allBookings)
    .filter((date) => {
      return date.date.substring(0, 4) === "2021";
    })
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return year2021.includes(room.number);
  });

  let totalCost2021 = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  return totalCost2021;
}

function getThirdYear() {
  let year2022 = allCustomers[1]
    .getCustomerBookings(allBookings)
    .filter((date) => {
      return date.date.substring(0, 4) === "2022";
    })
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return year2022.includes(room.number);
  });

  let totalCost2022 = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  return totalCost2022;
}

function getFourthYear() {
  let year2023 = allCustomers[1]
    .getCustomerBookings(allBookings)
    .filter((date) => {
      return date.date.substring(0, 4) === "2023";
    })
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return year2023.includes(room.number);
  });

  let totalCost2023 = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  return totalCost2023;
}

function getChartTotalCost() {
  let newTotal =
    getFirstYear() + getSecondYear() + getThirdYear() + getFourthYear();
  return newTotal;
}
