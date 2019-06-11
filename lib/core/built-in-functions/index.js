/*
*
*  ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
*  Bangalore, India. All Rights Reserved.
*
*/

// const dateTime = require('./date-time-functions');
const list = require('./list');
const boolean = require('./boolean');
// const decisionTable = require('./decision-table');
const strings = require('./string');
const numbers = require('./numeric');

const sort = {
  sort: (list, precedes) => {
    throw new Error('hello world!', list, precedes);
  },
};

let fnList = [ list, boolean, sort, numbers, strings ];
let fns = {};

fnList.reduce((fns, ns) => {
  Object.keys(ns).forEach(key => {
    fns[key] = ns[key];
  })
  return fns;
}, fns);

module.exports = Object.assign({}, list, boolean, sort, numbers, strings, { __fns__ : fns });

