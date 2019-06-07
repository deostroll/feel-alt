const { JSONPath } = require('jsonpath-plus');

//paths for extracting in JSONPath
const findInputData = '$.definitions.inputData';
const findDecisions = '$.definitions.decision';
const findItemDefinitions = '$.definitions.itemDefinition';
const findItemDefinitionWithName = name => `$.definitions.itemDefinition[?(@.$.name == "${name}")]`;
const findItemComponents = '$.itemComponent';
const findItemComponentWithName = name => `$.itemComponent[?(@.$.name == "${name}")]`

const primitives = ['number', 'boolean', 'string', 'dayTimeDuration', 'yearMonthDuration', 'dateTime', 'date', 'time'];

let isPrimitive = val => primitives.indexOf(val) > -1;

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
    var obj = {};
    obj.name = d.$.name;
    obj.typeRef = d.variable[0].$.typeRef
    if(obj.typeRef)
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

function getNestedItemComponents(doc, itemCompName) {
  let itemComp = jsonPathData(findItemComponentWithName(itemCompName), doc);
  let itemComponents = jsonPathData(findItemComponents, itemComp);
  return itemComponents.map((item) => {
    let obj = {};
    obj.name = item.$.name;
    obj.typeRef = item.typeRef ? item.typeRef[0] : undefined;
    obj.isCollection = item.$.isCollection;
    if(isPrimitive(obj.typeRef)) {
      return obj;
    } else {
      obj.itemComponent = [];
      obj.itemComponent = getItemComponents(itemComponents, obj.name);
    }
    return obj; 
  });
}

function getItemComponents(doc, itemDefName) {
  let itemDef = jsonPathData(findItemDefinitionWithName(itemDefName), doc);
  let itemComponents = jsonPathData(findItemComponents, itemDef);
  return itemComponents.map((item) => {
    let obj = {};
    obj.name = item.$.name;
    obj.typeRef = item.typeRef ? item.typeRef[0] : undefined;
    obj.isCollection = item.$.isCollection;
    if(isPrimitive(obj.typeRef)) {
      return obj;
    } else if(item.itemComponent) {
      obj.itemComponent = [];
      obj.itemComponent = getNestedItemComponents(itemDef, obj.name);
    } else if (!isPrimitive(obj.typeRef) && !item.itemComponent) {
      return obj;
    } else{
      throw Error('Came to else block')
    }
    return obj; 
  });
}

function getItemDefinitions(doc) {
  let itemDefinitions = jsonPathData(findItemDefinitions, doc);
  return itemDefinitions.map((d) => {
    let obj = {};
    obj.name = d.$.name;
    obj.typeRef = d.typeRef ? d.typeRef[0] : undefined;
    obj.isCollection = d.$.isCollection;
    obj.itemComponent = [];
    if(isPrimitive(obj.typeRef)) {
      return obj;
    } else if (d.itemComponent) {
      obj.itemComponent = getItemComponents(doc, obj.name);
    } else if (!isPrimitive(obj.typeRef) && !d.itemComponent) {
      return obj;
    } else{
      throw Error('Came to else block')
    }
    return obj;
  });
}

module.exports = {
  isPrimitive,
  getInputData,
  getDecisions,
  getItemDefinitions
};
