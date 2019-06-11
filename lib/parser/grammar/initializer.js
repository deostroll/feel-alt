const { NameResolver } = require('./helper');
const _ = require('lodash');
const assert = require('assert');

// const assert = require('assert');

function assertEqual(value1, value2) {
  assert(value1 === value2, `expected ${value2}, but got ${value1}`);
}

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
  let mode = options.helper.nameResolver.mode;
  let currentMode = mode[mode.length - 1];
  // console.log('ch:', ch);
  // console.log('state:', state);
  if(ch === '.' && currentMode === NameResolver.MODE_PATH_EXP ) {
    return false;
  }
  else {
    // console.log(state, NameResolver.MODE_PATH_EXP )
    assert(currentMode === NameResolver.MODE_DEFAULT, 'Not default mode');
    return true;
  }
  // return true;
}

function scopePathExpressionVariable(a) {
  options.helper.nameResolver.pushVar(a.variableName);
  // options.helper.nameResolver.mode.push(NameResolver.MODE_PATH_EXP); // since we are still in that mode...
  return a;
}

function pushMode(mode) {
  options.helper.nameResolver.enter(mode);
}

function popMode() {
  options.helper.nameResolver.exit();
}

function buildPathExpression(head, tail) {
  // console.log(head, tail);
  // let currentMode = options.helper.getCurrentMode();
  // console.log('mode:', currentMode);
  // return { type: 'path expression', path: [head.variableName, tail.variableName] }
  if(tail.type === 'name') {
    return { type: 'path expression', path: [head.variableName, tail.variableName ]};
  }
  else if(tail.type === 'path expression') {
    return { type: 'path expression', path: [ head.variableName, ...tail.path ]}
  }
}

/*
end - name resolution functions 
*/

function enter$path_expression() {
  pushMode(NameResolver.MODE_PATH_EXP);
}

function exit$path_expression(head, tail) {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_PATH_EXP, `expected ${NameResolver.MODE_PATH_EXP}`)
  assertEqual(options.helper.getCurrentMode(), NameResolver.MODE_PATH_EXP);
  popMode();
  return buildPathExpression(head, tail);
}

function enter$_defaulted_name_() {
  pushMode(NameResolver.MODE_DEFAULT);
}

function exit$_defaulted_name_(a) {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_DEFAULT, `expected ${NameResolver.MODE_DEFAULT}`);
  assertEqual(options.helper.getCurrentMode(), NameResolver.MODE_DEFAULT);
  popMode();
  return a;
}

function enter$_child_path_exp_() {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_DEFAULT, `expected ${NameResolver.MODE_DEFAULT}`);
  assertEqual(options.helper.getCurrentMode(), NameResolver.MODE_DEFAULT);  
  popMode();
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_PATH_EXP, `expected ${NameResolver.MODE_PATH_EXP}`);
  assertEqual(options.helper.getCurrentMode(), NameResolver.MODE_PATH_EXP);
  pushMode(NameResolver.MODE_CHILD_PATH_EXP);
}

function exit$_child_path_exp_(k) {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_CHILD_PATH_EXP, `expected ${NameResolver.MODE_CHILD_PATH_EXP}`);
  assertEqual(options.helper.getCurrentMode(), NameResolver.MODE_CHILD_PATH_EXP);
  popMode();
  return k;
}

function test$additional_name_symbols(sym) {
  return isValidSymbol(sym);
}

function test$name(head, tail) {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_DEFAULT, `expected ${NameResolver.MODE_DEFAULT}`);
  return isValidName(head, tail);
}

function exit$name(head, tail) {
  // assert(options.helper.getCurrentMode() === NameResolver.MODE_DEFAULT, `expected ${NameResolver.MODE_DEFAULT}`);
  return resolveName(head, tail);
}

function exit$parameters(params) {
  return params;
}

function processPositionalParams(params) {
  let [ partial ] = params;

  let [ head, [...tail]] = partial;
  let tailElems = tail.map(x => x[1]);
  return { type: 'positional parameters', arguments: [ head, ...tailElems ]};
}

function exit$positional_parameters(params) {
  return params.length ? processPositionalParams(params) : { type: 'positional parameters', arguments: [] };
}