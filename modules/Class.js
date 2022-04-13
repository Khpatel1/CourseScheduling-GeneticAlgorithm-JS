// class definition for Class
module.exports = class Class {
  classId;
  groupId;
  moduleId;
  professorId;
  timeslotId;
  roomId;

  // constructor for class
  constructor(classId, groupId, moduleId) {
    this.classId = classId;
    this.groupId = groupId;
    this.moduleId = moduleId;
  }

  //Add professor to class
  addProfessor(professorId) {
    this.professorId = professorId;
  }

  // Add timeslot to class
  addTimeslot(timeslotId) {
    this.timeslotId = timeslotId;
  }

  // Add room to class
  setRoom(roodId) {
    this.roomId = roodId;
  }

  // Get classId
  getClassId() {
    return this.classId;
  }

  // Get groupId
  getGroupId() {
    return this.groupId;
  }

  // Get moduleId
  getModuleId() {
    return this.moduleId;
  }

  // get professorId
  getProfessorId() {
    return this.professorId;
  }

  // get timeslotId
  getTimeslotId() {
    return this.timeslotId;
  }

  // get roomId
  getRoomId() {
    return this.roomId;
  }
};
