class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }

  getFirstName() {
    return this.name.split(" ")[0]
  }

  // Gets the customers booking details
  getCustomerBookings(bookingsData) {
    const customerBookings = bookingsData.filter((book) => {
      return book.userID === this.id;
    });

    return customerBookings;
  }
}

export default Customer;