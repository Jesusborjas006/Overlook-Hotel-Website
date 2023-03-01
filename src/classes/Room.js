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
}

export default Room;
