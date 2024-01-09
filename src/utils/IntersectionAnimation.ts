export default class IntersectionAnimation extends IntersectionObserver {
  constructor() {
    super();
  }

  private generateSteps(threshold: number[], endValue: number) {
    const delta = to / (Array.isArray(threshold) ? threshold.length - 1 : 1);
    const steps = threshold.map((_, index) => delta * index);
    // const st
    steps[0] = 0; // toDo change on initial value
    steps[steps.length - 1] = endValue;

    return steps;
  }

  private static getThresholdValueByIntersectionRatio(
    threshold: number[],
    intersectionRation: number
  ) {
    const deltaValues = threshold.map((item) => Math.abs(item - intersectionRation));

    const minDeltaValue = Math.min(...deltaValues);

    const index = deltaValues.indexOf(minDeltaValue);

    return threshold[index];
  }

  private static getIntersectionRatio(threshold: number[], intersectionRatio: number) {
    if (intersectionRatio === 1) return threshold[threshold.length - 1];

    if (intersectionRatio === 0) return threshold[0];

    return IntersectionAnimation.getThresholdValueByIntersectionRatio(threshold, intersectionRatio);
  }

  private checkIsTopPageIntersect(entry: IntersectionObserverEntry) {
    return !!(entry.boundingClientRect.top < 0);
  }

  private checkIsBottomPageIntersect(entry: IntersectionObserverEntry) {
    // error work when intersectionRatio === 1
    return entry.boundingClientRect.top > 0;
  }
}
