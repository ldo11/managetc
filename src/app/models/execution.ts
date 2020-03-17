import { Result } from './result';
export class Execution {
  _id: number;
  tc_name: string;
  project_name: string;
  tc_version: string;
  build_number: string;
  results: Result[];
  constructor(tcName, projectName, results) {
    this.tc_name = tcName;
    this.project_name = projectName;
    this.results = results;
    this.build_number="1.0";
  }
}
