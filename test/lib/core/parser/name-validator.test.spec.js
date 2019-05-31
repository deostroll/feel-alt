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

    it('should assert that the variable name exists in the containing document', function() {
        
        // console.log(JSON.stringify(getDecisions(jsonData), null, 1))
        var text = 'Full-Name'
        var helper = helperFactory(jsonData);
        var result = helper.isValidName(text);
        expect(result).to.be.equal(true);
    });

    it('should assert that the ast created is that of a name object', () => {
        let ast = parse('Full-Name', jsonData);
        let expected = {
            type:'name',
            variableName: 'Full-Name'
        };

        expect(ast).to.deep.equal(expected);
    });
});

