export class Result {
  _id: number;
  result: string;
  comment: string;
  step_id : number;
  action : string;
  expected : string;

  constructor(step_id:number, action:string, expected: string, result:string , comment:string){
    this.step_id = step_id;
    this.action = action;
    this.expected = expected;
    this.result = result;
    this.comment = comment;
  };
}
