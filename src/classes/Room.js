/* eslint-disable max-len */
class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }

  capitalizeRoomType() {
    const splitWords = this.roomType.split(" ");
    const capitalized = splitWords
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");

    return capitalized;
  }

  capitalizeBedSize() {
    return this.bedSize[0].toUpperCase() + this.bedSize.substring(1);
  }

  getRoundedCost() {
    const roundedCost = Number(this.costPerNight.toFixed());

    return roundedCost;
  }

  getBidetInfo() {
    if (this.bidet) {
      return "Bidet Included";
    } else {
      return "Bidet Not Included";
    }
  }

  getRoomImages() {
    if (this.roomType === "single room") {
      return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
    } else if (this.roomType === "residential suite") {
      return "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    } else if (this.roomType === "junior suite") {
      return "https://s7d2.scene7.com/is/image/ritzcarlton/laxlz-junior-suite-50675038?$XlargeViewport100pct$"
    } else {
      return "https://www.prevuemeetings.com/wp-content/uploads/2019/05/tyoph_p279_tokyo_suite_73826-2.jpg"
    }
  }
}

export default Room;
