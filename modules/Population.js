const Individual = require('./Individual');
let Random = require('./java-random');

module.exports = class Population {
  population = [Individual];
  populationFitness = -1;

  constructor(type, obj1, obj2) {
    if (type === 'CLONE') {
      this.population = obj1.getIndividuals;
      this.populationFitness = obj1.getPopulationFitness;
    }
    if (type === 'INIT') {
      var populationSize = obj1;
      let nums = [];
      nums.length = populationSize;
      this.population = nums;
    } else if (type === 'INITTIME') {
      var populationSize = obj1;
      let nums = [];
      nums.length = populationSize;
      this.population = nums;

      for (
        let individualCount = 0;
        individualCount < populationSize;
        individualCount++
      ) {
        var individual = new Individual('TIMETABLE', obj2);
        this.population[individualCount] = individual;
      }
    } else if (type === 'INITLEN') {
      var populationSize = obj1;
      nums = [];
      nums.length = populationSize;
      this.population = nums;

      for (
        let individualCount = 0;
        individualCount < populationSize;
        individualCount++
      ) {
        var individual = new Individual('INT', obj2);
        this.population[individualCount] = individual;
      }
    }
  }

  getIndividuals() {
    return this.population;
  }

  getFittest(offset) {
    this.population.sort((a, b) => {
      if (a.getFitness() > b.getFitness()) {
        return 1;
      } else {
        return -1;
      }
    });
    return this.population[offset];
  }

  setPopulationFitness(fitness) {
    this.populationFitness = fitness;
  }

  getPopulationFitness() {
    return this.populationFitness;
  }

  size() {
    return this.population.length;
  }

  setIndividual(offset, individual) {
    return (this.population[offset] = individual);
  }

  getIndividual(offset) {
    return this.population[offset];
  }

  shuffle() {
    let rnd = new Random(1);
    for (let i = this.population.length - 1; i > 0; i--) {
      let index = rnd.nextInt(i + 1);
      let a = this.population[index];
      this.population[index] = this.population[i];
      this.population[i] = a;
    }
  }
};
