/* eslint-disable max-len */
import Customer from "./classes/Customer";
import CustomerRepo from "./classes/CustomerRepo";
import Room from "./classes/Room";
import RoomRepo from "./classes/RoomRepo";
import "./css/styles.css";
import bookingsData from "./data/bookingTestData";
import customersTestData from "./data/customerTestData";
import roomsData from "./data/roomTestData";

// Query Selectors
const homePage = document.querySelector(".home-page");
const roomsPage = document.querySelector(".rooms-page");
const accountPage = document.querySelector(".account-page");

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

// Global Variables

// Customer Data
let customer = new Customer(customersTestData[0]);

// All Rooms Data !!!!!!!!!!!
let allRooms = roomsData.map((room) => new Room(room));
let roomsRepo = new RoomRepo(allRooms);
console.log(roomsRepo);

// Event Listeners

displayAllCustomerBookings();
displayCustomersName();
displayTotalCost()
displayRoomCards();
window.addEventListener("load", () => {});

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

// Functions

function displayRoomCards() {
  roomCardContainer.innerHTML = "";

  allRooms.forEach((room) => {
    roomCardContainer.innerHTML += `
    <div class="room-card">
      <img class="room-card-img" src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Room Image">
    <div class="room-text-content">
      <p class="cost-text"><span class="cost-span">$${room.getRoundedCost()}</span>/night</p>
      <h5 class="room-type-heading">${room.capitalizeRoomType()}</h5>
      <p class="room-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sed?</p>
    <div class="extra-features">
      <p>${room.capitalizeBedSize()} Size</p>
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
  customerNameHeading.innerText = `Welcome Back ${customer.getFirstName()}!`;
}

function displayAllCustomerBookings() {
  allBookingsBtn.classList.add("active-bookings-btn");
  upcomingBookingsBtn.classList.remove("active-bookings-btn");
  pastBookingsBtn.classList.remove("active-bookings-btn");

  bookingCardContainer.innerHTML = "";

  let customerAllBookings = customer.getCustomerBookings(bookingsData);

  customerAllBookings.forEach((book) => {
    bookingCardContainer.innerHTML += `
      <div class="bookings-card">
        <p><span>id:</span> ${book.id}</p>
        <p><span>userID:</span> ${book.userID}</p>
        <p><span>date:</span> ${book.date}</p>
        <p><span>roomNumber:</span> ${book.roomNumber}</p>
      </div`;
  });
}

function displayUpcomingCustomerBookings() {
  upcomingBookingsBtn.classList.add("active-bookings-btn");
  allBookingsBtn.classList.remove("active-bookings-btn");
  pastBookingsBtn.classList.remove("active-bookings-btn");

  bookingCardContainer.innerHTML = "";

  let customerUpcomingBookings = customer.getUpcomingBookings(bookingsData);
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

  let customerPastBookings = customer.getPastBookings(bookingsData);
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
  let customerBookings = customer
    .getCustomerBookings(bookingsData)
    .map((room) => {
      return room.roomNumber;
    });

  let allRoomsBooked = allRooms.filter((room) => {
    return customerBookings.includes(room.number);
  });

  let totalCost = allRoomsBooked.reduce((acc, current) => {
    return (acc += current.costPerNight);
  }, 0);

  console.log(totalCost);
  return totalCost;
}

function displayTotalCost() {
  spendingContainer.innerHTML = `
    <div class="card">
      <p class="spending-text"><span>Total Spending:</span> $${getCustomersTotal()}</p>
    </div>
  `;
}

