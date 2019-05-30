const DMNReader = require('./../core/dmn');

class Helper {

  constructor(doc) {
    this.doc = doc;
    this.nameContext = [];
  }

  prepareInitialContext() {
    
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

}

module.exports = helperFactory;