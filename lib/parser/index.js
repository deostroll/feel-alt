const pegParse = require('./feel').parse;
const helperFactory = require('./helper');

const noop_tracer = function() {};

function parse(input, ruleDocument) {
  let helper = helperFactory(ruleDocument);
  return pegParse(input, { helper, tracer: {trace: noop_tracer } });
}

function parse_debug(input, ruleDocument, tracer = noop_tracer) {
  let helper = helperFactory(ruleDocument);
  return pegParse(input, { helper, tracer: {trace: tracer } });
}

module.exports = { parse, parse_debug };