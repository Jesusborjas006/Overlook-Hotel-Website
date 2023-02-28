import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/Booking";
import bookingsData from "../src/data/bookingTestData";

describe("Booking", () => {
  let booking;
  let bookingData;

  beforeEach(() => {
    // This gets the first user's booking
    bookingData = bookingsData[4];
    booking = new Booking(bookingData);
  });

  it("Should be a function", () => {
    expect(Booking).to.be.a("function");
  });

  it("Should be an instance of Booking", () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it("Should have an id", () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6t8");
  });

  it("Should have a userId", () => {
    expect(booking.userID).to.equal(1);
  });

  it("Should have a date", () => {
    expect(booking.date).to.equal("2022/02/05");
  });

  it("Should have a room number", () => {
    expect(booking.roomNumber).to.equal(12);
  });
});
