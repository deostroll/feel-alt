const fs = require('fs');
const { parseString } = require('xml2js');

const readDmn = (fileName) => {
  var xml = fs.readFileSync(fileName, 'utf8');
  return new Promise((resolve, reject) => {
      parseString(xml, { trim: true }, function (err, result) {
          if (err) {
              reject(err);
          }
          else {
            resolve(result);
          }
      });
  });
};

module.exports = readDmn;