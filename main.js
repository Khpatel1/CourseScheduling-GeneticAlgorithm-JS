const GeneticAlgorithm = require('./modules/GeneticAlgorithm');
const Population = require('./modules/Population');
const Timetable = require('./modules/Timetable');

// Creates a Timetable with all the necessary course information.
let timetable = new Timetable('NEW', null);

//set up rooms
timetable.addRoom(1, 'A1', 15);
timetable.addRoom(2, 'B1', 30);
timetable.addRoom(4, 'D1', 20);
timetable.addRoom(5, 'F1', 25);

// Set up timeslots
timetable.addTimeslot(1, 'Mon 9:00 - 11:00');
timetable.addTimeslot(2, 'Mon 11:00 - 13:00');
timetable.addTimeslot(3, 'Mon 13:00 - 15:00');
timetable.addTimeslot(4, 'Tue 9:00 - 11:00');
timetable.addTimeslot(5, 'Tue 11:00 - 13:00');
timetable.addTimeslot(6, 'Tue 13:00 - 15:00');
timetable.addTimeslot(7, 'Wed 9:00 - 11:00');
timetable.addTimeslot(8, 'Wed 11:00 - 13:00');
timetable.addTimeslot(9, 'Wed 13:00 - 15:00');
timetable.addTimeslot(10, 'Thu 9:00 - 11:00');
timetable.addTimeslot(11, 'Thu 11:00 - 13:00');
timetable.addTimeslot(12, 'Thu 13:00 - 15:00');
timetable.addTimeslot(13, 'Fri 9:00 - 11:00');
timetable.addTimeslot(14, 'Fri 11:00 - 13:00');
timetable.addTimeslot(15, 'Fri 13:00 - 15:00');

// Set up professors
timetable.addProfessor(1, 'Dr P Smith');
timetable.addProfessor(2, 'Mrs E Mitchell');
timetable.addProfessor(3, 'Dr R Williams');
timetable.addProfessor(4, 'Mr A Thompson');

// Set up modules and define the professors that teach them
timetable.addModule(1, 'cs1', 'Computer Science', [1, 2]);
timetable.addModule(2, 'en1', 'English', [1, 3]);
timetable.addModule(3, 'ma1', 'Maths', [1, 2]);
timetable.addModule(4, 'ph1', 'Physics', [3, 4]);
timetable.addModule(5, 'hi1', 'History', [4]);
timetable.addModule(6, 'dr1', 'Drama', [1, 4]);

// Set up student groups and the modules they take.
timetable.addGroup(1, 10, [1, 3, 4]);
timetable.addGroup(2, 30, [2, 3, 5, 6]);
timetable.addGroup(3, 18, [3, 4, 5]);
timetable.addGroup(4, 25, [1, 4]);
timetable.addGroup(5, 20, [2, 3, 5]);
timetable.addGroup(6, 22, [1, 4, 5]);
timetable.addGroup(7, 16, [1, 3]);
timetable.addGroup(8, 18, [2, 6]);
timetable.addGroup(9, 24, [1, 6]);
timetable.addGroup(10, 25, [3, 4]);

console.log('**** TESTING ****');
timetable.printTimetable;

let ga = new GeneticAlgorithm(100, 0.01, 0.9, 2, 5);

let population = ga.initPopulation(timetable);

ga.evalPopulation(population, timetable);

let generation = 1;

while (
  ga.isTerminationConditionMet('GEN', generation, 100) == false &&
  ga.isTerminationConditionMet('POP', population, null) == false
) {
  console.log(
    'G' + generation + ' Best fitness: ' + population.getFittest(0).getFitness()
  );
  population = ga.crossoverPopulation(population);
  population = ga.mutatePopulation(population, timetable);
  ga.evalPopulation(population, timetable);
  generation++;
}

timetable.createClasses(population.getFittest(0));
console.log();
console.log('Solutions found in ' + generation + ' generations');
console.log('Final solution fitness: ' + population.getFittest(0).getFitness());
console.log('Clashes: ' + timetable.calcClashes());

console.log();
classes = timetable.getClasses();
classIndx = 1;

for (let i = 0; i < classes.length; i++) {
  bestClass = classes[i];
  console.log('Class ' + classIndex + ':');
  console.log(
    'Module: ' + timetable.getModule(bestClass.getModuleId()).getModuleName()
  );
  console.log(
    'Group: ' + timetable.getGroup(bestClass.getGroupId()).getGroupId()
  );
  console.log(
    'Room: ' + timetable.getRoom(bestClass.getRoomId()).getRoomNumber()
  );
  console.log(
    'Professor: ' +
      timetable.getProfessor(bestClass.getProfessorId()).getProfessorName()
  );
  console.log(
    'Time: ' + timetable.getTimeslot(bestClass.getTimeslotId()).getTimeslot()
  );
  console.log('-----');
  classIndex++;
}
