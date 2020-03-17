import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {Project} from '../../models/project';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {ExecutionService} from "../../services/execution.service";
import {Step} from '../../models/step';
import {Execution} from "../../models/execution";
import {Result} from "../../models/result";
import {MatTable} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss']
})
export class ExecutionComponent implements OnInit {

  projects: Array<Project>;
  testcases: Array<Testcase>;
  currenttc: Testcase;
  executetc: Execution;
  steps: Array<Step>;
  results:Array<Result>;
  pselected;
  tselected;
  no = 0;
  displayedColumns = ['Step', 'Action', 'Expected', 'Execution'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;

  constructor(private router: Router,
              private projectService: ProjectsService,
              private designService: DesignService,
              private executionService:ExecutionService) { }

  ngOnInit(): void {
    const email = 'luat01@gmail.com';
    this.projectService.findprojectbyemail(email).then((Projects: Array<Project>) => {
      if (Projects.length === 0) {
        alert('You are not assign to any project! Please contact your leader');
        this.router.navigateByUrl('/login');
      }
      this.pselected = Projects[0].name;
      console.dir(this.pselected);
      this.projects = Projects;
      this.loadtc(this.projects[0].name);
    });
  }
  loadtc(projectname) {
    console.log(projectname);
    this.designService.findtcinproject(projectname).then((Testcases: Array<Testcase>) => {
      this.testcases = Testcases;
      this.currenttc = this.testcases[0];
      this.tselected = this.currenttc.name;
      console.dir(this.tselected)
      this.steps = this.currenttc.steps;
    });
  }


}
