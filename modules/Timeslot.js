// represents a timeslot

module.exports = class Timeslot {
  timeslotId;
  timeslot;

  constructor(timeslotId, timeslot) {
    this.timeslotId = timeslotId;
    this.timeslot = timeslot;
  }

  getTimeslotId() {
    return this.timeslotId;
  }

  getTimeslot() {
    return this.getTimeslot;
  }
};
