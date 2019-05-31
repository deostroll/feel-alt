const DMNReader = require('./../core/dmn');

class NameResolver {
  constructor() {
    this.state = NameResolver.DEFAULT
    //TODO: cleanup - symbolCache not required
    this.symbolCache = [];
  }

  exit() {
    this.state = NameResolver.MODE_DEFAULT;
    this.symbolCache = [];
  }

  enter(mode) {
    this.state = mode;
  }

  pushSymbol(symbol) {
    this.symbolCache.push(symbol);
  }

  initContext(inputData, decisions) {
    this.inputData = inputData;
    this.decisions = decisions;
  }

  find(varName) {
    //TODO: trim extra spaces in between to single space
    return this.inputData.some(x => x.name === varName) || this.decisions.some(x => x.name === varName);

  }

  
}

NameResolver.MODE_DEFAULT = 'DEFAULT';
NameResolver.MODE_FUNCTION_DEF = 'FUNCTION_DEF';
NameResolver.MODE_PATH_EXP = 'PATH_EXPRESSION';

class Helper {

  constructor(doc) {
    this.doc = doc;
    this.nameResolver = new NameResolver();
    this._prepareInitialContext();
  }

  _prepareInitialContext() {
    let contexts = [];
    let inputData = DMNReader.getInputData(this.doc);
    let decisions = DMNReader.getDecisions(this.doc);
    this.nameResolver.initContext(inputData, decisions);
  }

  isValidName(varName) {
    // console.log('varName', varName)
    return this.nameResolver.find(varName);
  }

  resolveName(varName) {
    this.nameResolver.exit();
    return {
      type: 'name',
      variableName: varName
    }
  }
}

/**
 * helperFactory(ruleDoc)
 * 
 * Factory method which created a helper
 * which assists in the parsing of a feel
 * expression. Helper works with the awareness
 * of the rule document.
 * 
 * Rule document is a DMN xml document (json-ified)
 */
function helperFactory(ruleDoc) {
  return new Helper(ruleDoc);
}

module.exports = { helperFactory, NameResolver };