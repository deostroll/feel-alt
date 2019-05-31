const feel = require('./feel');
const pegParse = feel.parse;
const DefaultTracer = feel.DefaultTracer;

const { helperFactory } = require('./helper');

const noop_tracer = function() {};

function parse(input, ruleDocument) {
  let helper = helperFactory(ruleDocument);
  return pegParse(input, { helper, tracer: {trace: noop_tracer } });
}

function parse_debug(input, ruleDocument, tracer = new DefaultTracer) {
  let helper = helperFactory(ruleDocument);
  return pegParse(input, { helper, tracer });
}

module.exports = { parse, parse_debug };