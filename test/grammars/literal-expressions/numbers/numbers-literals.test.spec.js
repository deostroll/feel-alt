const { expect } = require('chai');
const chalk = require('chalk');

const { make } = require('./../../index');
describe(chalk.blue('Parsing number-literals'), () => {
    describe(chalk.green('Numbers'), () => {
        
        it('should conform the +ve number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: 1
            };
            var input = 1;
            var actual_ast = make(input);
            expect(actual_ast).to.deep.equal(expected_ast);
        })

        it('should conform the +ve decimal number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: 1.99999
            };
            var input = 1.99999;
            var actual_ast = make(input);
            expect(actual_ast).to.deep.equal(expected_ast);
        });

        it('should conform -ve number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: -1
            };
            var input = -1;
            var actual_ast = make(input);
            expect(actual_ast).to.deep.equal(expected_ast);
        });

        it('should conform -ve decimal number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: -1.99999
            };
            var input = -1.99999;
            var actual_ast = make(input);
            expect(actual_ast).to.deep.equal(expected_ast);
        });
    });
});