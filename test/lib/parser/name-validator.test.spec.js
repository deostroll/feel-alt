const parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const chalk = require('chalk');

const { NameResolver, helperFactory } = require('../../../../lib/parser/helper');
const { getDecisions, getInputData, getItemDefinitions } = require('../../../../lib/core/dmn/index');
const { parse } = require('../../../../lib/parser');

describe(chalk.blue('name validation if it contains "-"'), () => {

    var jsonData;
    before('read the dmn file and construct the jsonfied content', (done) => {
        var xml = fs.readFileSync(path.resolve(__dirname,'001-input-datastring.dmn'), 'utf8');
        parseString(xml, {trim: true}, function (err, result) {
            if(err) {
                done(err);
            }
            jsonData = result;
            done();
        });
    });

    it('should assert that the ast created is that of a path expression object', () => {
        let ast = parse('a.b.c', jsonData);
        let expected = {
            type:'path expression',
            path: ['a', 'b', 'c']
        };

        expect(ast).to.deep.equal(expected);
    });
});

