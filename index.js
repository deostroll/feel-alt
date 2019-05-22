const { evaluate } = require('./src/core/ast/evaluator');
const { parse } = require('./src/core/feel/index');
function noop() {};
function make(input) {
  return parse(input, { tracer: { trace: noop } })
};

function make_debug(input) {
  return parse(input);
}

module.exports = { evaluate, make, make_debug };