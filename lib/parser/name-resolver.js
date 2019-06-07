const { isPrimitive } = require('./../core/dmn');
const assert = require('assert');

function traverseVarStack(varStack, inputData, itemDefs) {
  let traverse = (stack, element = null) => {
    let varName = stack.shift();
    let el;
    if(!element) {
      el = inputData.find(x => x.name === varName);
      if(isPrimitive(el.typeRef)) {
        return el;
      }
      el = itemDefs.find(x => x.name === el.typeRef);
    }
    else if(element && typeof element.typeRef === 'string' && !isPrimitive(element.typeRef)) {
      assert(element.itemComponent.length === 0);
      el = itemDefs.find(x => x.name === element.typeRef);
    }
    else if(element && element.itemComponent.length) {
      el = element.itemComponent.find(x => x.name === varName)
    }
    if(stack.length) {
      return traverse(stack, el);
    }
    return el;
  };

  return traverse(varStack.slice());
}

class NameResolver {
  constructor() {
    // console.log('constructor')
    this.mode = [NameResolver.MODE_DEFAULT]
    this.varStack = [];
  }

  exit() {
    let popped = this.mode.pop();
    if(popped === NameResolver.MODE_PATH_EXP && this.mode.length === 1) {
      //! we can assert that the 1st element
      //! in the modes array is MODE_DEFAULT
      //! at this point
      this.varStack = [];
    }
  }

  enter(mode) {
    // console.log('enter:', mode);
    this.mode.push(mode);
  }

  initContext(inputData, decisions, itemDefinitions) {
    this.inputData = inputData;
    this.decisions = decisions;
    this.itemDefinitions = itemDefinitions;
  }

  find(varName) {
    //TODO: trim extra spaces in between to single space on varName
    //TODO: do we have to consider decision names also here?

    let { mode, varStack, inputData, itemDefinitions } = this;
    let currentMode = mode[mode.length - 1];
    if(currentMode === NameResolver.MODE_PATH_EXP && varStack.length) {
      let obj = traverseVarStack(varStack, inputData, itemDefinitions);
      assert(typeof obj.typeRef === 'undefined');
      return !!obj.itemComponent.find(x => x.name === varName);
      // return obj && obj.name === varName;
    }
    else if (currentMode === NameResolver.MODE_PATH_EXP && varStack.length === 0) {
      return this.inputData.some(x => x.name === varName) || this.decisions.some(x => x.name === varName);
    }
    
    //! mode is default
    assert(currentMode === NameResolver.MODE_DEFAULT);

    if(varStack.length) {
      //! We have probably come here through 
      //! a path expression
      let obj = traverseVarStack(varStack, inputData, itemDefinitions);
      // if(varStack.length === 1) {
      //   return obj.name === varName;
      // }
      // assert(typeof obj.typeRef === 'undefined');
      // return obj.itemComponent.some(x => x.name === varName);
      assert('itemComponent' in obj);
      assert(obj.itemComponent.length);
      return !!obj.itemComponent.find(x => x.name === varName);
    }
    
    return this.inputData.some(x => x.name === varName) || this.decisions.some(x => x.name === varName);

  }

  pushVar(varName) {
    this.varStack.push(varName);
  }

  
}

NameResolver.MODE_DEFAULT = 'DEFAULT';
NameResolver.MODE_FUNCTION_DEF = 'FUNCTION_DEF';
NameResolver.MODE_PATH_EXP = 'PATH_EXPRESSION';

module.exports = { NameResolver };