const parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const chalk = require('chalk');

const { NameResolver, helperFactory } = require('../../../lib/parser/helper');
const { getDecisions, getInputData, getItemDefinitions } = require('../../../lib/core/dmn/index');
const { parse } = require('../../../lib/parser');

describe(chalk.blue('name validation if it contains "-"'), () => {

    const readDmnFile = (fileName) => {
        var xml = fs.readFileSync(path.resolve(__dirname, `./data/${fileName}`), 'utf8');
        return new Promise((resolve, reject) => {
            parseString(xml, { trim: true }, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    it('validate the "-" in the inputData', function (done) {
        readDmnFile('001-input-datastring.dmn')
            .then((jsonData) => {
                //console.log(JSON.stringify(jsonData, null, 2));
                console.log(JSON.stringify(getInputData(jsonData), null, 1))
                var text = 'Full-Name'
                var helper = helperFactory(jsonData);
                var result = helper.isValidName(text);
                expect(result).to.be.equal(true);
                done();
            })
            .catch(done)
    });

    it('should assert that the ast created is that of a name object', () => {
        readDmnFile('001-input-datastring.dmn')
            .then((jsonData) => {
                let ast = parse('Full-Name', jsonData);
                let expected = {
                    type: 'name',
                    variableName: 'Full-Name'
                };

                expect(ast).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

});

