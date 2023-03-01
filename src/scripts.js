// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

// Query Selectors
const homePage = document.querySelector(".home-page");
const accountPage = document.querySelector(".account-page");

const accountLink = document.querySelector(".account-link");
const homeLink = document.querySelector(".home-link");

// Event Listeners
accountLink.addEventListener("click", () => {
  accountLink.classList.add("active-link");
  homeLink.classList.remove("active-link");
  homePage.classList.add("hidden");
  accountPage.classList.remove("hidden");
});

homeLink.addEventListener("click", () => {
  homeLink.classList.add("active-link")
  accountLink.classList.remove("active-link");
  accountPage.classList.add("hidden");
  homePage.classList.remove("hidden");
});

// Functions
