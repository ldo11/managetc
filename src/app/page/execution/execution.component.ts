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
  steps: Array<Step>;
  results = [];

  currenttc: Testcase;
  execution;
  pselected: Project;
  tselected: Testcase;

  resultselected:string;
  build_number="1.0";
  no = 0;
  displayedColumns = ['Step', 'Action', 'Expected', 'Comment', 'Execution', 'Update'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private designService: DesignService,
              private executionService: ExecutionService) {

  }

  ngOnInit(): void {
    this.resultselected="PASSED";
    const email = 'luat01@gmail.com';
    this.projectService.findprojectbyemail(email).then((Projects: Array<Project>) => {
      if (Projects.length === 0) {
        alert('You are not assign to any project! Please contact your leader');
        this.router.navigateByUrl('/login');
      }
      this.pselected = Projects[0];
      this.execution= { project_name:this.pselected.name};
      this.projects = Projects;
      this.loadtc(this.pselected.name);
    });

  }

  loadtc(projectname) {
    // console.log(projectname);
    this.designService.findtcinproject(projectname).then((Testcases: Array<Testcase>) => {
      this.testcases = Testcases;
      this.tselected = Testcases[0];
      //update execution data
      this.execution= { project_name:this.pselected.name,tc_name:this.tselected.name,tc_version:this.tselected.tc_version,build_number:this.build_number,results:this.results};
      this.steps = this.tselected.steps;

      //add result, comment
      this.steps.forEach(function(e){
        if(typeof e === "object"){
          e["result"] = "";
          e["comment"] = "";
        }
      });

      //convert to results
      this.results = [...this.steps];

      // this.results.forEach(function(e){
      //   console.dir(e);
      // });

    });
  }

  updateRowData(element) {
    console.dir(element);
    this.results = this.results.filter((value,key)=>{
      return value._id !== element._id;
    });

    console.log(element._id);
    this.executionService.postExecution(this.execution.tc_name,"tester",this.execution.tc_version,this.execution.build_number,this.results);

  }//end_updateRowData

  saveresult(){
    //this.executionService.postExecution(this.currenttc.name,this.currenttc.creator,this.currenttc.tc_version,this.build_number,this.results);
  }

}
