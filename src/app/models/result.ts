export class Result {
  _id: number;
  step_id:number;
  result: string;
  comment: string;
  constructor(stepid, result) {
    this.step_id = stepid;
    this.result = result;
  }
}
