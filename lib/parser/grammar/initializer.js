const { NameResolver } = require('./helper');
const _ = require('lodash');
// const assert = require('assert');

/*
begin - name resolution functions 

Functions to help in name resolution
during "path expression", "name" rule
matches in the grammar
*/
function isValidName(head, tail) {
  let varName = _.flattenDeep([head, tail]).join('');
  let flag = options.helper.isValidName(varName);
  return flag;
}

function resolveName(head, tail) {
  let varName = _.flattenDeep([head, tail]).join('');
  return options.helper.resolveName(varName);
}

function isValidSymbol(ch) {
  // let { helper: { nameResolver : { state } } } = options;
  let state = options.helper.nameResolver.state;
  // console.log('ch:', ch);
  // console.log('state:', state);
  if(ch === '.' && state === NameResolver.MODE_PATH_EXP ) {
    return false;
  }
  else {
    // console.log(state, NameResolver.MODE_PATH_EXP )
    console.assert(state === NameResolver.MODE_DEFAULT, 'Not default mode');
    return true;
  }
  // return true;
}

function scopePathExpressionVariable(a) {
  options.helper.nameResolver.pushVar(a.variableName);
  return a;
}

function pushMode(mode) {
  options.helper.nameResolver.enter(mode);
}

function popMode() {
  options.helper.nameResolver.exit();
}

/*
end - name resolution functions 
*/