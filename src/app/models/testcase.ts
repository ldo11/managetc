import { Step } from './step';
export class Testcase {
  _id: number;
  name: string;
  project_name: string;
  tc_version: string;
  status: string;
  creator: string;
  reviewer: string;
  steps: Step[];
}
