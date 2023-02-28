import chai from "chai";
import Customer from "../src/classes/Customer";
import customersTestData from "../src/data/customerTestData";
const expect = chai.expect;

describe("Customer", () => {
  let customer;
  let customerData;

  beforeEach(() => {
    customerData = customersTestData[0];
    customer = new Customer(customerData);
  });

  it("Should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("Should be an instance of Customer", () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it("Should have an id property", () => {
    console.log(customer.name);
    expect(customer.id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(customer.name).to.equal("Leatha Ullrich");
  });
});
