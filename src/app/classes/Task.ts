export default class Task {
  public id;
  public name;
  public description;
  public status;

  constructor(id: number, name: string, description: string, status: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }

  validate() {
    return !Object.keys(this).some(k => {
      if (this[k] === null || this[k] === '') {
        return true;
      }
    });
  }
}
