const { expect } = require('chai');
const chalk = require('chalk');

const { parse } = require('./../../../../lib/parser');
const { _internals } = require('./../../../../lib/parser/helper');
const Helper = _internals.Helper;
const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');

describe(chalk.blue('Parsing string-literals'), () => {
  describe(chalk.green('Strings'), () => {

    before('mock file', done => {
      let dmnFile = path.resolve(__dirname, '../../../data/mock.dmn');
      fs.readFile(dmnFile, { 'encoding' : 'utf8'}, (err, contents) => {
          if(err) {
              done(err)
          }
          else {
              parseString(contents, (err, data) => {
                  if(err) {
                      done(err)
                  }
                  else {
                      // mockDmnDocument = data;
                      mockHelper = new Helper(data);
                      done();
                  }
              })
          }
      })
  });

    it('should conform string "abcd1234" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'abcd1234'
      };
      var input = '"abcd1234"';
      var actual_ast = parse(input, mockHelper);
      expect(actual_ast).to.deep.equal(expected_ast);
    });

    it('should conform string "a$b#c@d" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'a$b#c@d'
      };
      var input = '"a$b#c@d"';
      var actual_ast = parse(input, mockHelper);
      expect(actual_ast).to.deep.equal(expected_ast);
    });

    it('should conform string "They\'re" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'They\'re'
      };
      var input = '"They\'re"';
      var actual_ast = parse(input, mockHelper);
      expect(actual_ast).to.deep.equal(expected_ast);
    });
  });
});