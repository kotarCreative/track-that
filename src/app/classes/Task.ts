export default class Task {
  public id;
  public name;
  public description;
  public estimatedTime;
  public status;
  public order;

  constructor(id: number, name: string, description: string, time: number, status: string, order: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.estimatedTime = time;
    this.status = status;
    this.order = order;
  }

  validate() {
    return !Object.keys(this).some(k => {
      if (this[k] === null || this[k] === '') {
        return true;
      }
    });
  }
}
