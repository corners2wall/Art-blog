export type AnimationStatus = 'stop' | 'run';

export type ChangeAnimationStatusEvent = CustomEvent<{ animationStatus: AnimationStatus }>;

export type AnimationOptions = {
  duration: number;
  end: number;
  timeFunction?: (time: number) => number;
};

// I am not sure but I think that It's necessary divided into two class
// First of them should be control animation
// Second should be control intersection
// And maybe third combine first and second. Why not?
export default class Animation {
  private id: number;
  private status: AnimationStatus;
  private start: number;
  private frameId: number;
  private static readonly fullFraction = 1;

  constructor() {
    this.id = this.generateId();
    this.status = 'stop';
    this.start = 0;
    this.frameId = 0;

    this.animate = this.animate.bind(this);
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

  public stop() {
    cancelAnimationFrame(this.frameId);
    this.setStatus('stop');
  }

  private generateId() {
    return new Date().valueOf() * Math.random();
  }

  public getId() {
    return this.id;
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
    const eps = 0.01;
    return (currentAnimationTime + eps).toFixed(2) >= Animation.fullFraction.toFixed(2);
  }

  private static linear = (timeFraction: number) => timeFraction;

  public animate(animationOptions: AnimationOptions, callback?: (value: number) => void) {
    const { duration, end, timeFunction = Animation.linear } = animationOptions;
    const startTime = performance.now();
    const delta = end - this.getStart();
    let prevFraction = 0;

    this.stop();
    this.setStatus('run');

    const runAnimationLoop = (currentTime: number) => {
      // for different time function we need keep current coefficient
      // looks on dx/dy
      const timeFraction = (currentTime - startTime) / duration;
      const currentFraction = delta * timeFunction(timeFraction);

      const isAnimationEnd = this.checkIsAnimationEnd(timeFraction);

      this.start += currentFraction - prevFraction;

      callback && callback(this.start);

      this.frameId = requestAnimationFrame(runAnimationLoop);

      prevFraction = currentFraction;

      if (isAnimationEnd) this.stop();
    };

    requestAnimationFrame(runAnimationLoop);
  }
}
