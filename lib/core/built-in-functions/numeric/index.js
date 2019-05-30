const decimal = (n, scale) => n.toFixed(scale);

const floor = (n) => Math.floor(n);

const ceiling = (n) => Math.ceil(n);

const abs = (n) =>  Math.abs(n);

const modulo = (dividend, divisor) => dividend % divisor;

const sqrt = (n) => Math.sqrt(n);

const log = (n) => Math.log(n);

const exp = (n) => Math.exp(n);

const odd = (n) => n%2 !== 0;

const even = (n) => n%2 === 0;

console.log(even( 5 ));


module.exports = {
    decimal,
    floor,
    ceiling,
    abs,
    modulo,
    sqrt,
    log,
    exp,
    odd,
    even
}