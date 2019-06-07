const fs = require('fs');

module.exports = (file, data) => fs.writeFileSync(file, JSON.stringify(data), { encoding: 'utf8'});