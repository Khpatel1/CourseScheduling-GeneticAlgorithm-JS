const Timetable = require('./Timetable');

// induival model

module.exports = class Individual {
  chromosome = [];
  fitness = -1;

  constructor(type, object) {
    if (type === 'TIMETABLE') {
      var newChromosome = [];
      var chromosomeIndex = 0;
      let timetable = new Timetable('CLONE', object);

      var groupArr = timetable.getGroupsAsArray;
      for (let i = 0; i < groupArr.length; i++) {
        group = groupArr[i];
        var moduleIds = group.getModuleIds();

        // loop through modules
        for (let j = 0; j < moduleIds.length; j++) {
          var moduleId = moduleIds[j];

          // add a random time
          var timeslotId = object.getRandomTimeslot().getTimeslotId();
          newChromosome[chromosomeIndex] = timeslotId;
          chromosomeIndex++;

          // add random room
          var roomId = object.getRandomroom().getRoomId();
          newChromosome[chromosomeIndex] = roomId;
          chromosomeIndex++;

          // add random professor
          var module = object.getModule(moduleId);
          newChromosome[chromosomeIndex] = module;
          chromosomeIndex++;
        }
      }
      this.chromosome = newChromosome;
    } else if (type === 'INT') {
      var chromosomeLength;
      var individual = [];
      for (let gene = 0; gene < chromosomeLength; gene++) {
        individual[gene] = gene;
      }
      this.chromosome = individual;
    } else if (type === 'INTARR') {
      this.chromosome = object;
    }
  }

  getChromosome() {
    return this.chromosome;
  }

  getChromosomeLength() {
    return this.chromosome.length;
  }

  setGene(offset, gene) {
    this.chromosome[offset] = gene;
  }

  getGene(offset) {
    return this.chromosome[offset];
  }

  setFitness(fitness) {
    this.fitness = fitness;
  }

  getFitness() {
    return this.fitness;
  }

  toString() {
    output = '';
    for (var gene = 0; gene < this.chromosome.length; gene++) {
      output += this.chromosome[gene] + ',';
    }
    return output;
  }

  containsGene(gene) {
    for (let i = 0; i < this.chromosome.length; i++) {
      if (this.chromosome[i] == gene) {
        return true;
      }
    }
    return false;
  }
};
