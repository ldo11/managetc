export class Step {
  _id: number;
  action: string;
  expected: string;
  constructor(a, e) {
    this.action = a;
    this.expected = e;
  }
}
