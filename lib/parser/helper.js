const DMNReader = require('./../core/dmn');
const { NameResolver } = require('./name-resolver');

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
    let itemDefs = DMNReader.getItemDefinitions(this.doc);
    this.nameResolver.initContext(inputData, decisions, itemDefs);
  }

  isValidName(varName) {
    // console.log('varName', varName)
    return this.nameResolver.find(varName);
  }

  resolveName(varName) {
    // this.nameResolver.exit();
    return {
      type: 'name',
      variableName: varName
    }
  }

  getCurrentMode() {
    let mode = this.nameResolver.mode;
    return mode[mode.length - 1];
  }
}

/**
 * helperFactory(instance)
 * 
 * Factory method which created a helper
 * which assists in the parsing of a feel
 * expression. Helper works with the awareness
 * of the rule document.
 * 
 * The argument can be a json-ized dmn document
 * or a helper constructed externally
 * Rule document is a DMN xml document (json-ified)
 */
function helperFactory(inst) {
  if(inst instanceof Helper) {
    return inst;
  }
  else {
    return new Helper(inst);
  }
}

let _internals = { Helper };
module.exports = { helperFactory, NameResolver, _internals };