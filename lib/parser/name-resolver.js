const { isPrimitive } = require('./../core/dmn');
const assert = require('assert');

function traverseVarStack(varStack, inputData, itemDefs) {
  let count = 0;
  let stack = varStack.slice();
  let obj = null;
  if(varStack.length === 1) {
    return inputData.find(x => x.name === varStack[0]);
  }
  while(stack.length) {
    let varName = stack.shift();
    if(count === 0) {
      let inpDataItem = inputData.find(x => x.name === varName);
      if(isPrimitive(inpDataItem.typeRef)) {
        return inpDataItem;
      }
      obj = itemDefs.find(x => x.name === inpDataItem.typeRef);
    }
    else if(obj && typeof obj.typeRef !== 'undefined') {
      assert(obj.itemComponent.length === 0); // it should not have itemComponent
      if(isPrimitive(inpDataItem.typeRef)) {
        return obj;
      }
      obj = itemDefs.find(x => x.name === obj.typeRef);      
    }
    else if(obj && obj.itemComponent.length) {
      obj = obj.itemComponent.find(x => x.name === varName);
      assert(obj); // should not be undefined
    }
    if(count < varStack.length && varStack.length !== 1) {
      assert(typeof obj.typeRef === 'undefined');
    }
    count++;
    // assert(varName === obj.name, `variable name (${varName}) doesn't exist in path (${varStack.join(' -> ')})`);
  }
  assert(obj); // we should return something meaningful to the callee
  return obj;
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
      return obj && obj.name === varName;
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
      if(varStack.length === 1) {
        return obj.name === varName;
      }
      assert(typeof obj.typeRef === 'undefined');
      return obj.itemComponent.some(x => x.name === varName);
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