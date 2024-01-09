type AnimationStatus = 'stop' | 'run';

type ChangeAnimationStatusEvent = CustomEvent<{ animationStatus: AnimationStatus }>;

type AnimationOptions = {
  duration: number;
  //   timeFunction:
};

// I am not sure but I think that It's necessary divided into two class
// First of them should be control animation
// Second should be control intersection
// And maybe third combine first and second. Why not?
export default class IntersectionAnimation {
  private id: number;
  private status: AnimationStatus;
  private end: number;
  private start: number;
  private delta: number;
  private frameId: number;
  private static readonly ANIMATION_END = 1;

  constructor() {
    this.id = 1;
    this.status = 'stop';
    this.start = 0;
    this.end = 0;
    this.delta = 0;
    this.frameId = 0;
  }

  // we can add this handler on  a setStatus() function
  private emitChangeAnimationStatusEvent(animationStatus: AnimationStatus) {
    const event = new CustomEvent(`change-animation-status-${this.id}`, {
      detail: { animationStatus },
    });

    // dispatch on window or maybe node?
    window.dispatchEvent(event);
  }

  private checkIsAnimationEnd(currentAnimationTime: number) {
    return currentAnimationTime.toFixed(2) >= IntersectionAnimation.ANIMATION_END.toFixed(2);
  }

  public animate(cb: any, animationOptions: AnimationOptions) {
    const { duration } = animationOptions;
    const startTime = performance.now();
    let prevFraction = 0;
    this.status = 'run';

    this.emitChangeAnimationStatusEvent(this.status);

    const runAnimationLoop = (currentTime: number) => {
      const timeFraction = (currentTime - startTime) / duration;

      const currentFraction = this.delta * timeFraction;

      const isAnimationEnd = this.checkIsAnimationEnd(currentTime);

      this.start += currentFraction - prevFraction;

      cb(this.start);

      this.frameId = requestAnimationFrame(runAnimationLoop);

      prevFraction = currentFraction;

      if (isAnimationEnd) {
        cancelAnimationFrame(this.frameId);
        this.status = 'stop';
        this.emitChangeAnimationStatusEvent(this.status);
      }
    };

    requestAnimationFrame(runAnimationLoop);
  }
}
