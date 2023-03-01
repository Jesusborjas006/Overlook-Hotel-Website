import chai from "chai";
const expect = chai.expect;
import CustomerRepo from "../src/classes/CustomerRepo";
import customersTestData from "../src/data/customerTestData";

describe("CustomerRepo", () => {
  let customerRepo;
  let customerData;

  beforeEach(() => {
    customerData = customersTestData;
    customerRepo = new CustomerRepo(customerData);
  });

  it("Should be a function", () => {
    expect(CustomerRepo).to.be.a("function");
  });

  it("Should be an instance of Customer Repo", () => {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepo);
  });

  it("Should have a property of customers", () => {
    expect(customerRepo.customers).to.deep.equal(customerData);
  });
});
