export class Execution {
  _id: number;
  tc_name: string;
  project_name: string;
  tc_version: string;
  build_number: string;
  start: string;
  end: string;
  results: Array<any>;
  constructor(tcName, projectName, tcVersion, buildNumber, results) {
    this.tc_name = tcName;
    this.project_name = projectName;
    this.tc_version = tcVersion;
    this.build_number = buildNumber;
    this.results = results;
  }
}
