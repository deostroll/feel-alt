const parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const chalk = require('chalk');

const { NameResolver, helperFactory } = require('../../../../lib/parser/helper');

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

    it('validate the "-" in the inputData', function(done) {
        var text = 'Full-Name'
        var helper = helperFactory(jsonData);
        var result = helper.isValidName(text);
        expect(result).to.be.equal(true);
    });
});

