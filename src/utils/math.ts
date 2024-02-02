export function clamp(min: number, input: number, max: number) {
  return Math.max(min, Math.min(input, max));
}
export function mapRange(
  inputMin: number,
  inputMax: number,
  currentValue: number,
  outputMin: number,
  outputMax: number
) {
  return ((currentValue - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}
