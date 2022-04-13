// group od students abstration

module.exports = class Group {
  groupId;
  groupSize;
  moduleIds = [];

  constructor(type, groupId, groupSize, moduleIds) {
    if (type === 'INIT') {
      this.groupId = groupId;
      this.groupSize = groupSize;
      this.moduleIds = moduleIds;
    }
    if (type === 'CLONE') {
      this.groupId = groupId.getGroupId;
      this.groupSize = groupId.getGroupSize;
      this.moduleIds = groupId.getModuleIds;
    }
  }

  //get groupId
  getGroupId() {
    return this.groupId;
  }

  //get groupSize
  getGroupSize() {
    return this.groupSize;
  }

  // get groups moduleIDs
  getModuleIds() {
    return this.moduleIds;
  }
};
