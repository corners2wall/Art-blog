export type AnimationStatus = 'stop' | 'run';

export type ChangeAnimationStatusEvent = CustomEvent<{ animationStatus: AnimationStatus }>;

type AnimationOptions = {
  duration: number;
  //   timeFunction:
};

// I am not sure but I think that It's necessary divided into two class
// First of them should be control animation
// Second should be control intersection
// And maybe third combine first and second. Why not?
export default class Animation {
  private id: number;
  private status: AnimationStatus;
  private end: number;
  private start: number;
  private frameId: number;
  private static readonly fullFraction = 1;

  constructor() {
    this.id = 0;
    this.status = 'stop';
    this.start = 0;
    this.end = 0;
    this.frameId = 0;
  }

  public setEnd(end: number) {
    this.end = end;
  }

  public getEnd() {
    return this.end;
  }

  public setStart(start: number) {
    this.start = start;
  }

  public getStart() {
    return this.start;
  }

  public getFrameId() {
    return this.frameId;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(status: AnimationStatus) {
    this.status = status;

    this.emitChangeAnimationStatusEvent(status);
  }

  public stopAnimation() {
    cancelAnimationFrame(this.frameId);
    this.setStatus('stop');
  }

  // maybe it's not needed here
  // in future remove
  private emitChangeAnimationStatusEvent(animationStatus: AnimationStatus) {
    const event = new CustomEvent(`change-animation-status-${this.id}`, {
      detail: { animationStatus },
    });

    // dispatch on window or maybe node?
    window.dispatchEvent(event);
  }

  private checkIsAnimationEnd(currentAnimationTime: number) {
    return currentAnimationTime.toFixed(2) >= Animation.fullFraction.toFixed(2);
  }

  public animate(animationOptions: AnimationOptions, callback?: (value: number) => void) {
    const { duration } = animationOptions;
    const startTime = performance.now();
    const delta = this.getEnd() - this.getStart();
    let prevFraction = 0;

    this.setStatus('run');

    const runAnimationLoop = (currentTime: number) => {
      const timeFraction = (currentTime - startTime) / duration;
      const currentFraction = delta * timeFraction;

      const isAnimationEnd = this.checkIsAnimationEnd(timeFraction);

      this.start += currentFraction - prevFraction;

      callback && callback(this.start);

      this.frameId = requestAnimationFrame(runAnimationLoop);

      prevFraction = currentFraction;

      if (isAnimationEnd) this.stopAnimation();
    };

    requestAnimationFrame(runAnimationLoop);
  }
}
