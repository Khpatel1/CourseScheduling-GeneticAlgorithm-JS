// used to store room capastity

module.exports = class Room {
  roomId;
  roomNumber;
  capacity;

  constructor(roomId, roomNumber, capacity) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.capacity = capacity;
  }

  getRoomId() {
    return this.roomId;
  }

  getRoomNumber() {
    return this.roomNumber;
  }

  getRoomCapacity() {
    return this.capacity;
  }

  roomStr() {
    return this.roomId + ' ' + this.roomNumber + ' ' + this.capacity;
  }
};
