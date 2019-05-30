const { JSONPath } = require('jsonpath-plus');

//paths for extracting in JSONPath
const findInputData = '$.definitions.inputData';
const findDecisions = '$.definitions.decision';
const findItemDefinitions = '$.definitions.itemDefinition';

function jsonPathData(path, object) {
  try {
    return JSONPath(path, object)[0];
  } catch (ex) {
    throw ex;
  }
}

function getInputData(doc) {
  var inputData = jsonPathData(findInputData, doc);
  return inputData.map((d) => {
    return {
      name: d.$.name,
      typeRef: d.variable[0].$.typeRef
    }
  });
}

function getDecisions(doc) {
  var inputData = jsonPathData(findDecisions, doc);
  return inputData.map((d) => {
    return {
      name: d.$.name,
      typeRef: d.variable[0].$.typeRef
    }
  });
}

function getItemDefinitions(doc) {
  var inputData = jsonPathData(findItemDefinitions, doc);
  return inputData.map((d) => {
    return {
      name: d.$.name,
      typeRef: d.variable[0].$.typeRef
    }
  });
}

module.exports = {
  getInputData,
  getDecisions,
  getItemDefinitions
};
