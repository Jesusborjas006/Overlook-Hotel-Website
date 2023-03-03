/* eslint-disable max-len */
import storedPromises from "./api-calls";
import Customer from "./classes/Customer";
import CustomerRepo from "./classes/CustomerRepo";
import Room from "./classes/Room";
import Booking from "./classes/Booking";
import "./css/styles.css";

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

// Global Variables
let allCustomers;
let allRooms;
let allBookings;
let customerRepository;

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
    passwordInput.value === "overlook2021"
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

  // Need a function that filters through both
  // Only the last function being invoked shows the num of results
  filterByDateAvailable();
  filterRoomByType();
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
    displayRoomCards();
  });
}

function displayRoomCards() {
  roomCardContainer.innerHTML = "";
  
  allRooms.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Room Image">
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
    </div>
    </div>
    <hr>
  `;
  });
}

function displayCustomersName() {
  customerNameHeading.innerText = `Welcome Back ${allCustomers[0].getFirstName()}!`;
}

function displayAllCustomerBookings() {
  allBookingsBtn.classList.add("active-bookings-btn");
  upcomingBookingsBtn.classList.remove("active-bookings-btn");
  pastBookingsBtn.classList.remove("active-bookings-btn");
  bookingCardContainer.innerHTML = "";

  let customerAllBookings = allCustomers[0].getCustomerBookings(allBookings);

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
    allCustomers[0].getUpcomingBookings(allBookings);
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

  let customerPastBookings = allCustomers[0].getPastBookings(allBookings);
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
  let customerBookings = allCustomers[0]
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
      <p class="spending-text"><span>Total Spending:</span> $${getCustomersTotal()}</p>
    </div>
  `;
}

function filterByDateAvailable() {
  let customersDate = dateInput.value;
  let changeToSlash = customersDate.replaceAll("-", "/");

  const bookedRoomsNumber = allBookings
    .filter((room) => {
      return room.date === changeToSlash;
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
    return notBookedYet
  });

  roomResults.innerText = `${notBookedYet.length} Results`;
  roomCardContainer.innerHTML = "";

  notBookedYet.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Room Image">
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
    </div>
    </div>
    <hr>
  `;
  });
  return notBookedYet;
}

function filterRoomByType() {
  let customersRoomType = roomTypeInput.value;

  let available = allRooms.filter((room) => {
    return room.roomType === customersRoomType;
  });

  roomResults.innerText = `${available.length} Results`;
  roomCardContainer.innerHTML = "";

  available.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Room Image">
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
    </div>
    </div>
    <hr>
  `;
  });

  return available;
}

// function filterByBoth() {
//   let roomsByDate = filterByDateAvailable();
//   let roomTypes = filterRoomByType();

// 2023/11/09 (#9 and #14) dont exist in roomsByDate
// 13 total single rooms
// #9 is a single room
// When both the date (2023/11/09) and type (single) are applied we should get 12 results

//   console.log("both", roomsByDate)
//   console.log("both", roomTypes)
// }
