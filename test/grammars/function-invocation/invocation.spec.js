const { expect } = require('chai');
const chalk = require('chalk');

const { parse_debug } = require('./../../../lib/parser');
const { _internals } = require('./../../../lib/parser/helper');
const Helper = _internals.Helper;
const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');

const writeJson = require('./../../test-utils/write-json');
const { Tracer , NoopTracer } = require('./../../test-utils/tracer');
const readDmn = require('./../../test-utils/read-dmn');

const mockDMNFile = path.resolve(__dirname,'./../../data/mock.dmn');

describe(chalk.blue('Grammar tests...'), () => {
  describe(chalk.green('Function Invocation...'), () => {
    it('should generate the ast for a simple function invocation - type 1', done => {
      var expected_ast = {
        type: 'function invocation',
        fn: { type: 'name', variableName: 'sum' },
        params: { type: 'positional parameters', arguments: [ { type: 'number', value: 1 }, { type: 'number', value: 2 } ] }
      };

      //read some mock dmn file
      readDmn(mockDMNFile)
        .then(data => {
          let helper = new Helper(data);
          let input = 'sum(1,2)';
          let tracer = new Tracer(input);
          try {
            var actual_ast = parse_debug(input, helper, NoopTracer);
          }
          catch(e) {
            var result = tracer.getResult();
            writeJson('trace.json', result);
            throw e;
          }
          // console.dir(actual_ast);
          expect(actual_ast).to.deep.equal(expected_ast);
          done();
        })
        .catch(done);

    });

    it('should generate the ast for a simple function invocation - type 2', done => {
      var expected_ast = {
        type: 'function invocation',
        fn: { type: 'name', variableName: 'sum' },
        params: { type: 'positional parameters', arguments: [ { type: 'number', value: 1 }, { type: 'number', value: 2 }, { type: 'number', value: 3 } ] }
      };

      //read some mock dmn file
      readDmn(mockDMNFile)
        .then(data => {
          let helper = new Helper(data);
          let input = 'sum(1,2,3)';
          let tracer = new Tracer(input);
          try {
            var actual_ast = parse_debug(input, helper, NoopTracer);
          }
          catch(e) {
            var result = tracer.getResult();
            writeJson('trace.json', result);
            throw e;
          }
          // console.dir(actual_ast);
          expect(actual_ast).to.deep.equal(expected_ast);
          done();
        })
        .catch(done);

    });
  })
});