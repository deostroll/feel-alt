const { expect } = require('chai');
const chalk = require('chalk');

const { make } = require('./../../index');
describe(chalk.blue('Parsing string-literals'), () => {
  describe(chalk.green('Strings'), () => {

    it('should conform string "abcd1234" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'abcd1234'
      };
      var input = '"abcd1234"';
      var actual_ast = make(input);
      expect(actual_ast).to.deep.equal(expected_ast);
    });

    it('should conform string "a$b#c@d" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'a$b#c@d'
      };
      var input = '"a$b#c@d"';
      var actual_ast = make(input);
      expect(actual_ast).to.deep.equal(expected_ast);
    });

    it('should conform string "They\'re" to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'They\'re'
      };
      var input = '"They\'re"';
      var actual_ast = make(input);
      expect(actual_ast).to.deep.equal(expected_ast);
    });
  });
});