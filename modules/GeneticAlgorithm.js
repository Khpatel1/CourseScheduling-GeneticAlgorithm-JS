const Individual = require('./Individual');
const Population = require('./Population');
const Timetable = require('./Timetable');

module.exports = class GeneticAlgorithm {
  populationSize;
  mutationRate;
  crossoverRate;
  elitismCount;
  tournamentSize;

  constructor(
    populationSize,
    mutationRate,
    crossoverRate,
    elitismCount,
    tournamentSize
  ) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.elitismCount = elitismCount;
    this.tournamentSize = tournamentSize;
  }

  initPopulation(timetable) {
    let population = new Population('INITTIME', this.populationSize, timetable);
    return population;
  }

  isTerminationConditionMet(type, obj1, obj2) {
    if (type === 'GEN') {
      return obj1 > obj2;
    } else if (type === 'POP') {
      return obj1.getFittest(0).getFitness() == 1.0;
    }
  }

  calcFitness(individual, timetable) {
    threadTimetable = new Timetable('CLONE', timetable);
    threadTimetable.createClasses(individual);

    clashes = threadTimetable.calcClashes();
    fitness = 1 / (clashes + 1);

    individual.setFitness(fitness);

    return fitness;
  }

  evalPopulation(population, timetable) {
    let populationFitness = 0.0;
    let lPopulation = new Population('CLONE', population, null);
    let pops = lPopulation.getIndividuals;
    for (let i = 0; i < pops.length; i++) {
      individual = pops[i];
      populationFitness += this.calcFitness(individual, timetable);
    }
    population.setPopulationFitness(populationFitness);
  }

  selectParent(populationObj) {
    let tournament = new Population('INIT', this.tournamentSize);
    let population = new Population('CLONE', populationObj);
    population.shuffle;

    for (let i = 0; i < this.tournamentSize; i++) {
      let tournamentIndividual = population.getIndividual(i);
      tournament.setIndividual(i, tournamentIndividual);
    }

    return tournament.getFittest(0);
  }

  mutatePopulation(population, timetable) {
    let newPopulation = new Population('INIT', this.populationSize);

    for (
      let populationIndex = 0;
      populationIndex < population.size();
      populationIndex++
    ) {
      let individual = population.getFittest(populationIndex);

      let randomIndividual = new Individual(timetable);

      for (
        let geneIndex = 0;
        geneIndex < individual.getChromosomeLength();
        geneIndex++
      ) {
        if (populationIndex > this.elitismCount) {
          if (this.mutationRate > Math.random()) {
            individual.setGene(geneIndex, randomIndividual.getGene(geneIndex));
          }
        }
      }
      newPopulation.setIndividual(populationIndex, individual);
    }

    return newPopulation;
  }

  crossoverPopulation(population) {
    let newPopulation = new Population('INIT', population.size(), null);

    for (
      let populationIndex = 0;
      populationIndex < population.size();
      populationIndex++
    ) {
      let parent1 = population.getFittest(populationIndex);

      if (
        this.crossoverRate > Math.random() &&
        populationIndex >= this.elitismCount
      ) {
        let offspring = new Individual(parent1.getChromosomeLength());
        let parent2 = this.selectParent(population);

        for (
          let geneIndex = 0;
          geneIndex < parent1.getChromosomeLength();
          geneIndex++
        ) {
          if (0.5 > Math.random()) {
            offspring.setGene(geneIndex, parent1.getGene(geneIndex));
          } else {
            offspring.setGene(geneIndex, parent2.getGene(geneIndex));
          }
        }

        newPopulation.setIndividual(populationIndex, offspring);
      } else {
        newPopulation.setIndividual(populationIndex, parent1);
      }
    }
    return newPopulation;
  }
};
