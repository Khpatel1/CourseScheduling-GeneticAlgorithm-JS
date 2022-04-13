//main eval class for the class schedule
const Room = require('./Room');
const Professor = require('./Professor');
const Module = require('./Module');
const Group = require('./Group');
const Timeslot = require('./Timeslot');
const Individual = require('./Individual');
const Class = require('./Class');

module.exports = class Timetable {
  rooms = new Map();
  professors = new Map();
  modules = new Map();
  groups = new Map();
  timeslots = new Map();
  classes = [];
  numClasses = 0;

  constructor(type, cloneable) {
    if (type === 'NEW') {
      this.rooms = new Map();
      this.professors = new Map();
      this.modules = new Map();
      this.groups = new Map();
      this.timeslots = new Map();
      console.log('New Timetable created');
    }
    if (type === 'CLONE') {
      this.rooms = cloneable.getRooms;
      this.professors = cloneable.getProfessors;
      this.modules = cloneable.getModules;
      this.groups = cloneable.getGroups;
      this.timeslots = cloneable.getTimeslots;
    }
  }

  printTimetable() {
    console.log('*** ROOMS ***');
    let roomArr = [Room];
    roomArr = this.getRoomsAsArray;
    for (let i = 0; i < roomArr.length; i++) {
      console.log(roomArr[i].roomStr);
    }
  }

  // get groups
  getGroups() {
    return this.groups;
  }

  // get timeslots
  getTimeslots() {
    return this.timeslots;
  }

  // get modules
  getModules() {
    return this.modules;
  }

  // get professors
  getProfessors() {
    return this.professors;
  }

  // add new room
  addRoom(roomId, roomName, capacity) {
    this.rooms.set(roomId, new Room(roomId, roomName, capacity));
  }

  // add new professor
  addProfessor(professorId, professorName) {
    this.professors[professorId] = new Professor(professorId, professorName);
  }

  // add new module
  addModule(moduleId, moduleCode, module, professorIds) {
    this.modules[moduleId] = new Module(
      moduleId,
      moduleCode,
      module,
      professorIds
    );
  }

  // add new group
  addGroup(groupId, groupSize, moduleIds) {
    this.groups[groupId] = new Group(groupId, groupSize, moduleIds);
  }

  // add new timeslot
  addTimeslot(timeslotId, timeslot) {
    this.timeslots[timeslotId] = new Timeslot(timeslotId, timeslot);
  }

  // create classes using individual chromosome
  createClasses(individual) {
    var classes = [];
    var chromosome = [];
    chromosome = individual.getChromosome();
    var chromosomePos = 0;
    var classIndex = 0;

    let groups = this.getGroupsAsArray;
    for (let i = 0; i < groups.length; i++) {
      let tempgroup = groups[i];
      let group = new Group('CLONE', tempgroup);
      let moduleIds = group.getModuleIds;

      for (let j = 0; j < moduleIds.length; j++) {
        classes[classIndex] = new Class(
          classIndex,
          group.getGroupId,
          moduleIds[j]
        );

        // add timeslot
        classes[classIndex].addTimeslot(chromosome[chromosomePos]);
        chromosomePos++;

        //add room
        classes[classIndex].setRoom(chromosome[chromosomePos]);
        chromosome++;

        //add professor
        classes[classIndex].addProfessor(chromosome[chromosomePos]);
        chromosomePos++;

        classIndex++;
      }
    }
    this.classes = classes;
  }

  // getRoom(int)
  // get room from roomId
  getRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      console.log("Rooms doesn't contain key ", roomId);
    }
    return this.rooms.get(roomId);
  }

  // getRooms()
  // get rooms map
  getRooms() {
    return this.rooms;
  }

  // getRandomRoom()
  // get a randome room
  getRandomRoom() {
    roomsArray = Array.from(this.rooms.values());
    let arrLength = roomsArray.length;
    var room = roomsArray[(arrLength * Math.random()) | 0];
    return room;
  }

  // getProfessor(int)
  // get professor from professor id
  getProfessor(professorId) {
    return this.professors.get(professorId);
  }

  // getModule(int)
  // get module from moduleID
  getModule(moduleId) {
    return this.modules.get(moduleId);
  }

  // getGroupModules(int)
  // get moduleIds of student group
  getGroupModules(groupId) {
    let group = this.groups.get(groupId);
    return group.getModuleIds();
  }

  // getGroup(int)
  // get group from groupId
  getGroup(groupId) {
    return this.groups.get(groupId);
  }

  // getGroupsAsArray()
  // get all student groups
  getGroupsAsArray() {
    console.log('get groups as array');
    return Array.from(this.groups.values());
  }

  getRoomsAsArray() {
    var rt = [Room];
    rt = Array.from(this.rooms.values);
    return rt;
  }

  // getTimeslot(int)
  // get timeslot by timeslotId
  getTimeslot(timeslotId) {
    return this.timeslots.get(timeslotId);
  }

  // getRandomTimeslot()
  // get random timeslotId
  getRandomTimeslot() {
    timeslotArr = Array.from(this.timeslots.values());
    return timeslotArr[(timeslotArr.length * Math.random()) | 0];
  }

  // getClasses()
  // get classes
  getClasses() {
    return this.classes;
  }

  // getNumClasses()
  // get the number of classes that need scheduling
  getNumClasses() {
    if (this.numClasses > 0) {
      return this.numClasses;
    }

    let numberClasses = 0;
    let grps = Array.from(this.groups.values());
    for (let i = 0; i < grps.length; i++) {
      grp = grps[i];
      numberClasses = numberClasses + grp.getModuleIds().length;
    }
    this.numClasses = numberClasses;
    return this.numClasses;
  }

  // calcClashes()
  // Calculat the number of clashes between Classes generates by a chromosome
  calcClashes() {
    var clashes = 0;

    for (let i = 0; i < this.classes.length; i++) {
      var classA = this.classes[i];
      var rmId = classA.getRoomId();
      var room1 = this.getRoom(rmId);
      var grpId = classA.getGroupId();
      var group1 = this.getGroup(grpId);
      var roomCapacity = room1.getRoomCapacity();
      var groupSize = group1.getGroupSize();

      if (roomCapacity < groupSize) {
        clashes++;
      }

      //check if room is taken
      for (let j = 0; j < this.classes.length; j++) {
        var classB = this.classes[j];
        var ck1 = classA.getRoomId() == classB.getRoomId();
        var ck2 = classA.getTimeslotId() == classB.getTimeslotId();
        var ck3 = classA.getClassId() != classB.getClassId();

        if (ck1 && ck2 && ck3) {
          clashes++;
          break;
        }
      }

      // check if professor is available
      for (let j = 0; j < this.classes.length; j++) {
        var classB = this.classes[j];
        var ck1 = classA.getProfessorId() == classB.getProfessorId();
        var ck2 = classA.getTimeslotId() == classB.getTimeslotId();
        var ck3 = classA.getClassId() != classB.getClassId();

        if (ck1 && ck2 && ck3) {
          clashes++;
          break;
        }
      }
    }
    return clashes;
  }
};
