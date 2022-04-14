// used to store room capastity

module.exports = class Room {
  roomId = 0;
  roomNumber = 0;
  capacity = 0;

  constructor(type, obj1, roomNumber, capacity) {
    if (type == 'INIT') {
      this.roomId = obj1;
      this.roomNumber = roomNumber;
      this.capacity = capacity;
    }
    if (type == 'CLONE') {
      this.roomId = obj1.getRoomId;
      this.roomNumber = obj1.getRoomNumber();
      this.capacity = obj1.getRoomCapacity();
    }
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
    console.log(
      'Room ID: ',
      this.roomId + ', Room number: ',
      this.roomNumber + ', Room capacity: ' + this.capacity
    );
  }
};
