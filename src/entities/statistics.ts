export class Statistics<T> {
  name: string;
  data: T;

  constructor(name: string, data: T) {
    this.name = name;
    this.data = data;
  }
}
