import Customer from "./classes/Customer";
import CustomerRepo from "./classes/CustomerRepo";
import "./css/styles.css";
import bookingsData from "./data/bookingTestData";
import customersTestData from "./data/customerTestData";

// Query Selectors
const homePage = document.querySelector(".home-page");
const roomsPage = document.querySelector(".rooms-page")
const accountPage = document.querySelector(".account-page");

const accountLink = document.querySelector(".account-link");
const homeLink = document.querySelector(".home-link");
const roomsLink = document.querySelector(".rooms-link");

const bookingCardContainer = document.querySelector(".bookings-card-container");
const customerNameHeading = document.querySelector(".account-heading");

// Global Variables
let customer = new Customer(customersTestData[0]);
console.log(customer);

let customerRepo = new CustomerRepo(customersTestData);
// Gets the first customer
console.log(customerRepo.customers[0]);

// Event Listeners

displayBookingCards();
displayCustomersName();
window.addEventListener("load", () => {});

homeLink.addEventListener("click", () => {
  displayHomePage();
});

roomsLink.addEventListener("click", () => {
  displayRoomsPage()
})

accountLink.addEventListener("click", () => {
  displayAccountPage();
});

// Functions

function displayCustomersName() {
  customerNameHeading.innerText = `Welcome Back ${customer.getFirstName()}!`;
}

function displayBookingCards() {
  bookingCardContainer.innerHTML = "";

  let customerBookings = customer.getCustomerBookings(bookingsData);

  customerBookings.forEach((book) => {
    bookingCardContainer.innerHTML += `
      <div class="bookings-card">
        <p><span>id:</span> ${book.id}</p>
        <p><span>userID:</span> ${book.userID}</p>
        <p><span>date:</span> ${book.date}</p>
        <p><span>roomNumber:</span> ${book.roomNumber}</p>
      </div`;
  });

  console.log(customerBookings);
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
  roomsPage.classList.remove("hidden")
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
