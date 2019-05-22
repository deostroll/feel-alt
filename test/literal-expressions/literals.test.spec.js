const { expect } = require('chai');
const chalk = require('chalk');

const { make } = require('./../../index');
describe(chalk.blue('Parsing literals'), () => {
  describe(chalk.green('Strings'), () => {
    it('should conform to the expected ast node', () => {
      var expected_ast = {
        type: 'string',
        value: 'They\'re'
      };
      var input = '"They\'re"';
      var actual_ast = make(input);
      expect(actual_ast).to.deep.equal(expected_ast);
    })
  });
});