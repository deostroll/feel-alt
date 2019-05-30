const _ = require('lodash');

const listContains = (list, element) => list.includes(element);

const count = (list) => list.length;

const min = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    return Math.min(...list)
};

const max = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    return Math.max(...list)
};

const sum = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    return list.reduce((a, b) => a + b, 0);
};

const mean = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    return list.reduce((a, b) => a + b, 0) / list.length;
};

const all = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    else if (list.length === 1 && list[0] === 0) {
        return null
    }
    return !list.includes(false);
};

const any = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    else if (list.length === 1 && list[0] === 0) {
        return null
    }
    return list.includes(true);
};

const sublist = (list, start, length) => {
    start -= 1;
    return list.slice(start, length);
}

const append = (list, ...item) => list.concat(item);

const concatenate = (...item) => {
    var result = [];
    for (var i = 0; i < item.length; i += 1) {
        result = result.concat(item[i]);
    }
    return result;
};

const insertBefore = (list, pos, newItem) => {
    if (pos < 1) {
        throw new error('recieved position which is less than 1');
    }
    list.splice(pos - 1, 0, newItem);
    return list;
}

const remove = (list, pos) => {
    if (pos < 1) {
        throw new error('recieved position which is less than 1');
    }
    list.splice(pos - 1, 1);
    return list;
}

const reverse = (list) => _.reverse(list);

const indexOf = (list, match) => {
    var result = [];
    list.forEach((element, index) => element === match ? result.push(index + 1) : null);
    return result;
};

const union = (...list) => _.union(...list);

const distinctValues = (list) => {
    if (!Array.isArray(list)) {
        throw new Error('operation unsupported on element of this type');
    } else {
        return _.uniq(list);
    }
};

const flatten = (...args) => _.flattenDeep(args);

const product = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }
    return list.reduce((a, b) => a * b, 1);
};

const median = (...list) => {
    if (typeof list[0] === 'object' && list.length === 1) {
        list = list[0];
    }

    if (list.length === 0) return null;

    list.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(list.length / 2);

    if (list.length % 2)
        return list[half];

    return (list[half - 1] + list[half]) / 2.0;
}

const stdAverage = (list) => list.reduce((a, b) => a + b, 0) / (list.length - 1);

const standardDeviation = (...values) => {
    if (typeof values[0] === 'object' && values.length === 1) {
        values = values[0];
    }

    var avg = mean(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    
    var avgSquareDiff = stdAverage(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

const mode = arr => { 
    if(arr.filter((x,index)=>arr.indexOf(x)==index).length == arr.length) return arr;
    else return mode(arr.sort((x,index)=>x-index).map((x,index)=>arr.indexOf(x)!=index ? x : null ).filter(x=>x!=null)) 
}

module.exports = {
    'list contains': listContains,
    count,
    min,
    max,
    sum,
    mean,
    all,
    any,
    sublist,
    append,
    concatenate,
    'insert before': insertBefore,
    remove,
    reverse,
    'index of': indexOf,
    union,
    'distinct values': distinctValues,
    flatten,
    product,
    median,
    stddev: standardDeviation,
    mode
}