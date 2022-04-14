const Room = require('./modules/Room');
const Timetable = require('./modules/Timetable');

let timetable = new Timetable('NEW', null);

timetable.addRoom(1, 201, 10);

timetable.printTimetable();

let r1 = new Room('INIT', 1, 101, 10);
let r2 = new Room('INIT', 2, 201, 10);
let r3 = new Room('INIT', 3, 301, 10);
let r4 = new Room('INIT', 4, 401, 10);
let r5 = new Room('INIT', 5, 501, 10);

let myMap = new Map();
myMap.set(1, r1);
myMap.set(2, r1);
myMap.set(3, r3);
myMap.set(4, r4);
myMap.set(5, r5);

let arr2 = [Room];
arr2 = Array.from(myMap.values);

for (let i = 0; i < 4; i++) {
  let temp = new Room('CLONE', arr2[i], null, null);
  console.log('idx: ', i, ' ');
  temp.roomStr();
}
