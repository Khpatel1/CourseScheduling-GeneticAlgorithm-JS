// simple professor abstraction

module.exports = class Professor {
  professorId;
  professorName;

  constructor(professorId, professorName) {
    this.professorId = professorId;
    this.professorName = professorName;
  }

  getProfessorId() {
    return this.professorId;
  }

  getProfessorName() {
    return this.professorName;
  }
};
