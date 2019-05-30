const substring = (string, start, length) => {
    if (length && start > -1) {
        return string.substr(start - 1, length);
    } else if (length && start <= -1) {
        return string.substr(start, length);
    } else if (start > -1) {
        return string.substr(start - 1);
    }

    return string.substr(start);
}

const stringLength = (string) => string.length;

const upperCase = (string) => string.toUpperCase();

const lowerCase = (string) => string.toLowerCase();

const substringBefore = (string, match) => {
    const index = string.indexOf(match);
    return index !== -1 ? string.substring(0, index) : '';
}

const substringAfter = (string, match) => {
    const index = string.indexOf(match);
    return index !== -1 ? string.substring(index + match.length, string.length) : '';
}

const replace = (string, match) => {

}

const contains = (string, match) => string.indexOf(match) > -1;

const startsWith = (string, match) => string.startsWith(match);

const endsWith = (string, match) => string.endsWith(match);

const matches = (input, pattern, flags) => 'should write';

const splitMethod = (string, delimiter) => string.split(delimiter);

module.exports = {
    substring,
    'string length': stringLength,
    'upper case': upperCase,
    'lower case': lowerCase,
    'substring before': substringBefore,
    'substring after': substringAfter,
    'replace': replace,
    'contains': contains,
    'starts with': startsWith,
    'ends with': endsWith,
    'matches': matches,
    'split': splitMethod
}