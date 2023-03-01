import chai from "chai";
const expect = chai.expect;
import RoomRepo from "../src/classes/RoomRepo";
import roomsData from "../src/data/roomTestData";

describe("RoomRepo", () => {
  let allRoomsData;
  let rooms;

  beforeEach(() => {
    allRoomsData = roomsData;
    rooms = new RoomRepo(allRoomsData);
  });

  it("Should be a function", () => {
    expect(RoomRepo).to.be.a("function");
  });

  it("Should be an instance of RoomRepo", () => [
    expect(rooms).to.be.an.instanceOf(RoomRepo),
  ]);

  it("Should have store all rooms in a property", () => {
    expect(rooms.rooms).to.deep.equal(allRoomsData)
  })
});
