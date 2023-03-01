class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }

  getFirstName() {
    return this.name.split(" ")[0];
  }

  // Gets the customers booking details
  getCustomerBookings(bookingsData) {
    const customerBookings = bookingsData.filter((book) => {
      return book.userID === this.id;
    });

    return customerBookings;
  }

  getPastBookings(bookingsData) {
    const customerBookings = bookingsData.filter((book) => {
      return book.userID === this.id;
    });

    // This gets todays date
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "/" + mm + "/" + dd;

    // This will compare all dates to todays date
    const pastBookings = customerBookings.filter((date) => {
      return date.date < today;
    });

    return pastBookings;
  }

  getUpcomingBookings(bookingsData) {
    const customerBookings = bookingsData.filter((book) => {
      return book.userID === this.id;
    });

    // This gets todays date
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "/" + mm + "/" + dd;

    // This will compare all dates to todays date
    const upcomingBookings = customerBookings.filter((date) => {
      return date.date > today;
    });

    return upcomingBookings;
  }
}

export default Customer;
