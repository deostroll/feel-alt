const { expect } = require('chai');
const chalk = require('chalk');

const { parse } = require('./../../../lib/parser');
const { _internals } = require('./../../../lib/parser/helper');
const Helper = _internals.Helper;
const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');

describe(chalk.blue('validating path expressions'), () => {
    describe(chalk.green('PathExpressions'), () => {

        before('mock file', done => {
            let dmnFile = path.resolve(__dirname, './data/001-input-datastring.dmn');
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
                            mockHelper = new Helper(data);
                            done();
                        }
                    })
                }
            })
        });

        it('should conform pathExpression "a.b.c" to the expected ast node', () => {
            var expected_ast = {
                type: 'path expression',
                path: ['a', 'b', 'c']
            };
            var input = "a.b.c";
            var actual_ast = parse(input, mockHelper);
            expect(actual_ast).to.deep.equal(expected_ast);
        });

    });
});