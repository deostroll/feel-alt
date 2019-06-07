const { expect } = require('chai');
const chalk = require('chalk');

const { parse } = require('./../../../../lib/parser');
const { _internals } = require('./../../../../lib/parser/helper');
const Helper = _internals.Helper;
const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');

describe(chalk.blue('Parsing number-literals'), () => {
    describe(chalk.green('Numbers'), () => {
        let mockHelper;

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
        })
        it('should conform the +ve number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: 1
            };
            var input = '1';
            var actual_ast = parse(input, mockHelper);
            
            expect(actual_ast).to.deep.equal(expected_ast);
        })

        it('should conform the +ve decimal number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: 1.99999
            };
            var input = '1.99999';
            // var actual_ast = parse(input);
            var actual_ast = parse(input, mockHelper);
            expect(actual_ast).to.deep.equal(expected_ast);
        });

        it('should conform -ve number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: -1
            };
            var input = '-1';
            // var actual_ast = make(input);
            var actual_ast = parse(input, mockHelper);
            expect(actual_ast).to.deep.equal(expected_ast);
        });

        it('should conform -ve decimal number to the expected ast node', () => {
            var expected_ast = {
                type: 'number',
                value: -1.99999
            };
            var input = '-1.99999';
            // var actual_ast = make(input);
            var actual_ast = parse(input, mockHelper);
            expect(actual_ast).to.deep.equal(expected_ast);
        });
    });
});