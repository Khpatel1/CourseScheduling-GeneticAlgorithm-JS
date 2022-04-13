// Simple course module abstraction, which defines the Professors teaching the module.

module.exports = class Module {
  moduleId;
  moduleCode;
  module;
  professorIds = [];

  constructor(moduleId, moduleCode, module, professorIds) {
    this.moduleId = moduleId;
    this.moduleCode = moduleCode;
    this.module = module;
    this.professorIds = professorIds;
  }

  // get moduleId
  getModuleId() {
    return this.moduleId;
  }

  // get module Code
  getModuleCode() {
    return this.moduleCode;
  }

  //get random professor id
  getProfessorId() {
    var professorId =
      this.professorIds[(this.professorIds.length * Math.random()) | 0];
    return professorId;
  }
};
