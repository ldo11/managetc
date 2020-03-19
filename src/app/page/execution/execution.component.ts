import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {ExecutionService} from '../../services/execution.service';
import {Step} from '../../models/step';
import {Execution} from '../../models/execution';

import { RtStorageService } from '../../services/rt-storage.service';
import { UtilService } from '../../services/util.service';
import {MatTable} from '@angular/material/table';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss']
})
export class ExecutionComponent implements OnInit {
  testcases: Testcase;
  clicked = true;
  startTest = false;
  email;
  execution;
  numstep;
  displayedColumns = ['Step', 'Action', 'Expected', 'Comment', 'Execution'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;

  constructor(private local: RtStorageService,
              private util: UtilService,
              private router: Router,
              private arouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private designService: DesignService,
              private executionService: ExecutionService) {

  }

  ngOnInit(): void {
    this.email = this.util.getCookie(this.local.CURR_USER_EMAIL);
    const tcname = this.arouter.snapshot.paramMap.get('tc');
    this.designService.findtestcasebyname(tcname).then((tc: Testcase) => {
      this.testcases = tc;
      this.numstep = tc.steps.length;
     });
  }
saveresult() {
  this.executionService.getExecutionId(this.execution._id).then((ex: Execution) => {
    if (ex.results.length < this.numstep) {
      alert('The execution is not done, please mark all step');
    } else {
      const body = {
        id: this.execution._id,
        end: new Date()
      };
      this.executionService.endTest(body).then(_ => {
        alert('Thank you for completing this execution!')
        this.router.navigateByUrl('design');
      });
    }
  });
}

  start(name, build) {
    if (build === '') {
      alert('Enter the build number');
      this.clicked = false;
    } else {
      this.executionService.postExecution(name, this.email, this.testcases.tc_version, build, new Date())
        .then((ex: Execution) => {
          console.log(ex);
          this.execution = ex;
          this.startTest = true;
          alert('you can start execute now!');
        });
    }
  }

updateRowData(event: HTMLSelectElement, id, eStepid) {
    if (this.startTest) {
      const comment = 'c' + id;
      const ecomment = ( document.getElementById(comment) as HTMLInputElement).value;
      // console.log(( document.getElementById(comment) as HTMLInputElement).value);
      // console.log(event.value);
      const body = {
        id: this.execution._id,
        step_id: eStepid,
        result: event.value,
        comment: ecomment
      };
      this.executionService.upsertStep(body).then();
    } else {
      alert('Please enter build and click start button before execute!');
    }
}
}
