import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/Booking";
import Customer from "../src/classes/Customer";
import customersTestData from "../src/data/customerTestData";
import bookingsData from "../src/data/bookingTestData";

describe("Customer", () => {
  let customer;
  let customerData;
  // eslint-disable-next-line no-unused-vars
  let booking;
  let bookingTestData;

  beforeEach(() => {
    customerData = customersTestData[0];
    customer = new Customer(customerData);
    bookingTestData = bookingsData;
    booking = new Booking(bookingTestData);
  });

  it("Should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("Should be an instance of Customer", () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it("Should have an id property", () => {
    expect(customer.id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(customer.name).to.equal("Leatha Ullrich");
  });

  it("Should get the customers first name", () => {
    expect(customer.getFirstName()).to.equal("Leatha");
  });

  it("Should get the customers booking details", () => {
    expect(customer.getCustomerBookings(bookingTestData)).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12,
      },
      {
        date: "2023/01/11",
        id: "5fwrgu4i7k55hl6x8",
        roomNumber: 20,
        userID: 1,
      },
    ]);
  });

  it("Should get past bookings", () => {
    expect(customer.getPastBookings(bookingTestData)).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12,
      },
      {
        id: "5fwrgu4i7k55hl6x8",
        userID: 1,
        date: "2023/01/11",
        roomNumber: 20,
      },
    ]);
  });

  it("Should get upcoming bookings", () => {
    expect(customer.getUpcomingBookings(bookingTestData)).to.deep.equal([])
  });
});
