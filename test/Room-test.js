import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/Room";
import roomsData from "../src/data/roomTestData";

describe("Room", () => {
  let room;
  let roomData;

  beforeEach(() => {
    roomData = roomsData[11];
    room = new Room(roomData);
  });

  it("Should be a function", () => {
    expect(Room).to.be.a("function");
  });

  it("Should be an instance of Room", () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it("Should have a room number", () => {
    expect(room.number).to.equal(12);
  });

  it("Should have a room type", () => {
    expect(room.roomType).to.equal("single room");
  });

  it("Should have a bidet boolean value", () => {
    expect(room.bidet).to.equal(false);
  });

  it("Should have a bed size", () => {
    expect(room.bedSize).to.equal("twin");
  });

  it("Should have a number of beds", () => {
    expect(room.numBeds).to.equal(2);
  });

  it("Should have a cost per night", () => {
    expect(room.costPerNight).to.equal(172.09);
  });

  // it("Should get all rooms", () => {
  //   console.log(room)
  // })
});
