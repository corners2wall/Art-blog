import Animation, { AnimationOptions } from './Animation';

export interface IntersectionOptions extends IntersectionObserverInit {
  runningOn: 'top' | 'bottom' | 'always';
  threshold: number[] | number;
}

// ToDo make simplify

// ToDo pass time function

// ToDo add signature without callback

// ToDo Add steps depends on threshold
// for example
// threshold: [0, 0.1, 0.2, 1]
// end value: 10
// steps should be [0, 1, 2, 10]

export default class ScrollAnimation {
  private intersectionObserver: IntersectionObserver;
  private animation: Animation;
  private threshold: number[];
  private steps: number[];

  constructor(
    intersectionOption: IntersectionOptions,
    animationOptions: AnimationOptions,
    animationCallback?: (node: Element, value: number) => void
  ) {
    const intersectionObserverCallback = this.getIntersectionObserverCallback(
      intersectionOption,
      animationOptions,
      animationCallback
    );
    this.animation = new Animation();
    this.threshold = this.setThreshold(intersectionOption.threshold);
    this.steps = this.setSteps(animationOptions.end);
    this.intersectionObserver = ScrollAnimation.createIntersectionObserver(
      intersectionObserverCallback,
      intersectionOption
    );
  }

  private setThreshold(value: number | number[]) {
    return Array.isArray(value) ? value : [value];
  }

  private static createIntersectionObserver(
    intersectionObserverCallback: IntersectionObserverCallback,
    options: IntersectionObserverInit
  ) {
    return new IntersectionObserver(intersectionObserverCallback, options);
  }

  private setSteps(endValue: number) {
    const delta = endValue / (this.threshold.length - 1);
    const steps = this.threshold.map((_, index) => delta * index);

    steps[0] = 0; // toDo change on initial value
    steps[steps.length - 1] = endValue;

    return steps;
  }

  public subscribe(element: Element) {
    this.intersectionObserver.observe(element);
  }

  public unsubscribe(element: Element) {
    this.intersectionObserver.unobserve(element);
  }

  public getAnimation() {
    return this.animation;
  }

  private static getIntersectionRatio(threshold: number[], intersectionRation: number) {
    const deltaValues = threshold.map((item) => Math.abs(item - intersectionRation));

    const minDeltaValue = Math.min(...deltaValues);

    const index = deltaValues.indexOf(minDeltaValue);

    return threshold[index];
  }

  private static checkIsTopPageIntersect(entry: IntersectionObserverEntry) {
    const clientTop = entry.boundingClientRect.top;
    const bottom = window.innerHeight;
    const top = 0;

    return Math.abs(clientTop - top) < Math.abs(clientTop - bottom);
  }

  private static checkIsBottomPageIntersect(entry: IntersectionObserverEntry) {
    const clientTop = entry.boundingClientRect.top;
    const bottom = window.innerHeight;
    const top = 0;

    return Math.abs(clientTop - top) > Math.abs(clientTop - bottom);
  }

  private static callbackStab = (node: Element, value: number) => {};

  private getIntersectionObserverCallback(
    intersectionOption: IntersectionOptions,
    animationOptions: AnimationOptions,
    animationCallback = ScrollAnimation.callbackStab
  ) {
    const { runningOn } = intersectionOption;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const intersectionRatio = ScrollAnimation.getIntersectionRatio(
          this.threshold,
          entry.intersectionRatio
        );

        const isBottomIntersect =
          ScrollAnimation.checkIsBottomPageIntersect(entry) && runningOn === 'bottom';

        const isTopIntersect =
          ScrollAnimation.checkIsTopPageIntersect(entry) && runningOn === 'top';

        const intersectionRatioIndex = this.threshold.indexOf(intersectionRatio);

        const end = this.steps[intersectionRatioIndex];

        const animationCallbackWithNode = animationCallback.bind(this, entry.target);

        if (runningOn === 'always')
          this.animation.animate({ ...animationOptions, end }, animationCallbackWithNode);

        if (isTopIntersect)
          this.animation.animate({ ...animationOptions, end }, animationCallbackWithNode);

        if (isBottomIntersect)
          this.animation.animate({ ...animationOptions, end }, animationCallbackWithNode);
      });
    };

    return callback;
  }
}
