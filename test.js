const Room = require('./modules/Room');
const Timetable = require('./modules/Timetable');

let timetable = new Timetable('NEW', null);

let r1 = new Room(1, 201, 10);

console.log(r1.roomStr());
