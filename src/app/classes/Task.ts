export default class Task {
  public id;
  public name;
  public description;
  public estimatedTime;
  public actualTime;
  public status;
  public order;
  private _timer;

  constructor(id: number, name: string, description: string, estimatedTime: number, actualTime: number, status: string, order: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.estimatedTime = estimatedTime ? estimatedTime : null;
    this.actualTime = actualTime ? actualTime : 0;
    this.status = status;
    this.order = order;
  }

  /**
   * Make sure all fields are filled in.
   *
   * @return boolean
   */
  validate() {
    return !Object.keys(this).some(k => {
      if (this[k] === null || this[k] === '') {
        return true;
      }
    });
  }

  /**
   * Time how long the task is taking.
   */
  startTimer() {
    const addTime = _ => {
      this.actualTime += 0.0166666666;
    };

    this._timer = setInterval(addTime, 600);
  }

  /**
   * Stop the currently running timer.
   */
  stopTimer() {
    clearInterval(this._timer);
    this._timer = null;
  }

  get timerRunning() {
    return !!this._timer;
  }
}
