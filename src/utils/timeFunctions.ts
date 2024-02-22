export const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function quad(fraction: number) {
  return Math.pow(fraction, 2);
}

export function circ(fraction: number) {
  return 1 - Math.sin(Math.acos(fraction));
}

export function makeEasyOut(timeFunction: (fraction: number) => number) {
  return (fraction: number) => 1 - timeFunction(1 - fraction);
}
