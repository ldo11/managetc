import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, Validators} from "@angular/forms";
import {Project} from '../../models/project';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {ExecutionService} from '../../services/execution.service';
import {Step} from '../../models/step';
import {Execution} from '../../models/execution';
import {Result} from '../../models/result';
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
  pselected: Project;
  tselected: Testcase;

  steps: Array<Step>;
  results:Array<Result>;
  executions: {steps,results};

  resultselected:string;
  no = 0;
  displayedColumns = ['Step', 'Action', 'Expected', 'Execution'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private designService: DesignService,
              private executionService: ExecutionService) { }

  ngOnInit(): void {
    this.resultselected="PASSED";
    const email = 'luat01@gmail.com';
    this.projectService.findprojectbyemail(email).then((Projects: Array<Project>) => {
      if (Projects.length === 0) {
        alert('You are not assign to any project! Please contact your leader');
        this.router.navigateByUrl('/login');
      }
      this.pselected = Projects[0];
      this.projects = Projects;
      this.loadtc(this.pselected.name);

    });
  }

  resultForm = this.formBuilder.group({

  });


  loadtc(projectname) {
    console.log(projectname);
    this.designService.findtcinproject(projectname).then((Testcases: Array<Testcase>) => {
      this.testcases = Testcases;
      this.tselected = Testcases[0];
      // this.executetc = new Execution(this.tselected,this.pselected,[]);
      this.currenttc = this.tselected;
      this.steps = this.currenttc.steps;
    });
  }



  addresultforeachstep(step: Step,result:Result){
    console.dir(this.resultselected)
    this.results.push(new Result(step,result));
  }
  saveresult(){

    this.executionService.postExecution(this.currenttc.name,this.currenttc.creator,this.currenttc.tc_version,"1.0",this.results);
  }

}
