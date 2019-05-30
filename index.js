const { evaluate } = require('./lib/core/ast/evaluator');
const { parse } = require('./lib/parser');
function noop() {};

/**
 * Generates the ast from the input
 * feel expression provided
 * @param {string} input - feel expression to parse
 * @returns {object} - the object graph representing the ast
 */
function make(input) {
  return parse(input, { tracer: { trace: noop } })
};


/**
 * Generates ast from input feel
 * expression. The parsing generates
 * parsing traces to stdout which 
 * is useful for debugging grammar
 * @param {string} input 
 * @returns {object} - the object graph representing the ast
 */
function make_debug(input) {
  return parse(input);
}

module.exports = { evaluate, make, make_debug };