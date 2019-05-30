const DMNReader = require('./../core/dmn');

class NameResolver {
  constructor() {
    this.state = NameResolver.DEFAULT
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

  
}

NameResolver.MODE_DEFAULT = 'DEFAULT';
NameResolver.MODE_FUNCTION_DEF = 'FUNCTION_DEF';
NameResolver.MODE_PATH_EXP = 'PATH_EXPRESSION';

class Helper {

  constructor(doc) {
    this.doc = doc;
    this.nameResolver = new NameResolver();
  }

  _prepareInitialContext() {
    let contexts = [];
    let inputData = DMNReader.getInputData(this.doc);
    let decisions = DMNReader.getDecisions(this.doc);
    this.nameResolver.initContext(inputData, decisions);
  }

  isValidName(text) {
    DMNReader.validateName(this.doc, text);
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