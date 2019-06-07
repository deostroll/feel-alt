const { isFeelPrimitive } = require('./../core/dmn');

function traverseVarStack(varStack, inputData, itemDefs) {
  // return varStack.reduce((obj, item, idx) => {
  //   if(idx === 0) {
  //     let id = null;
  //     inputData.every((inpDataItem) => {
  //       if(inpDataItem.name === item) {
  //         id = inpDataItem;
  //         return false;
  //       }
  //       return true;
  //     }); // inputData.every()
  //     return itemDefs.find(el => el.name === id.name);
  //   }
  //   else if(obj.itemComponents.length > 0) {
  //     return obj.itemComponents.find(el => el.name === item);
  //   }
  //   else if(obj.itemComponents.length === 0) {
  //     console.assert(typeof obj.typeRef === 'string', 'typeRef should be string');
  //     return itemDefs.find(el => el.name === obj.typeRef);
  //   }
    
  // },null); //varStack.reduce()
  let count = 0;
  let stack = varStack.slice();
  let obj = null;
  while(stack.length) {
    let varName = stack.shift();
    if(count === 0) {
      let inpDataItem = inputData.find(x => x.name === varName);
      if(isFeelPrimitive(inpDataItem.typeRef)) {
        return inpDataItem;
      }
      obj = itemDefs.find(x => x.name === inpDataItem);
    }
    else if(obj && typeof obj.typeRef !== 'undefined') {
      console.assert(obj.itemComponents.length === 0); // it should not have itemComponents
      if(isFeelPrimitive(inpDataItem.typeRef)) {
        return obj;
      }
      obj = itemDefs.find(x => x.name === obj.typeRef);      
    }
    else if(obj && obj.itemComponents.length) {
      obj = obj.itemComponents.find(x => x.name === varName);
      console.assert(obj); // should not be undefined
    }
    if(count < varStack.length) {
      console.assert(typeof obj.typeRef === 'undefined');
    }
    count++;
    console.assert(varName === obj.name, `variable name (${varName}) doesn't exist in path (${varStack.join(' -> ')})`);
  }
  console.assert(obj); // we should return something meaningful to the callee
  return obj;
}

class NameResolver {
  constructor() {
    // console.log('constructor')
    this.state = NameResolver.MODE_DEFAULT
    this.varStack = [];
  }

  exit() {
    this.state = NameResolver.MODE_DEFAULT;
    this.varStack = [];
  }

  enter(mode) {
    // console.log('enter:', mode);
    this.state = mode;
  }

  initContext(inputData, decisions, itemDefinitions) {
    this.inputData = inputData;
    this.decisions = decisions;
    this.itemDefinitions = itemDefinitions;
  }

  find(varName) {
    //TODO: trim extra spaces in between to single space on varName
    //TODO: do we have to consider decision names also here?
    
    let { state, varStack, inputData, itemDefinitions } = this;

    if(state === NameResolver.MODE_PATH_EXP) {
      let obj = traverseVarStack(varStack, inputData, itemDefinitions);
      return obj && obj.name === varName;
    }
    // ! when mode is default
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