import { Step } from './step';
export class Testcase {
  _id: number;
  name: string;
  project_name: string;
  tc_version: string;
  status: string;
  creator: string;
  designer: string;
  reviewer: string;
  steps: Step[];
  constructor(name, p, c) {
    this.name = name;
    this.project_name = p;
    this.creator = c;
  }
}
