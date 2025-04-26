/**
 * format bytes
 * @param value (number to be rounded)
 * @param precision (Decimals point)
 *
 * */

export function round(value: number, precision: number = 0): number {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function nextHighestIncrementOf10(num: number): number {
  let result = Math.ceil(num / 10) * 10;
  result % (result / 10) === 0 ? (result = result + 10) : result;
  return result;
}

export function nextLowestIncrementOf10(num: number): number {
  let result = Math.floor(num / 10) * 10;
  result % (result / 10) === 0 ? (result = result - 10) : result;
  result === 0 ? (result = 10) : result;
  return result;
}
