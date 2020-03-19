import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {Project} from '../../models/project';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {Step} from '../../models/step';
import {MatTable} from '@angular/material/table';
import { RtStorageService } from '../../services/rt-storage.service';
import { UtilService } from '../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  projects: Array<Project>;
  testcases: Array<Testcase>;
  currenttc: Testcase;
  steps: Array<Step>;
  role;
  pselected;
  tselected;
  stselected;
  liststatuts = [{k: '1', v: 'New'}, {k: '2', v: 'In-progress'} , {k: '3', v: 'Ready for review'}, {k: '4', v: 'Approved'}];
  displayedColumns = ['Step', 'Action', 'Expected', 'Delete'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;

  constructor(private local: RtStorageService,
              private util: UtilService,
              private router: Router,
              private arouter: ActivatedRoute,
              private projectService: ProjectsService,
              private designService: DesignService) { }

  ngOnInit(): void {
    const email = this.util.getCookie(this.local.CURR_USER_EMAIL);
    this.pselected = this.arouter.snapshot.paramMap.get('p');
    this.tselected = this.arouter.snapshot.paramMap.get('tc');
    this.role = this.util.getCookie(this.local.CURR_USER_ROLE);
    this.loadproject(email);
  }
  loadproject(email) {
    this.projectService.findprojectbyemail(email, this.role ).then((Projects: Array<Project>) => {
      if (Projects.length === 0) {
        alert('You are not assign to any project! Please contact your leader');
        this.router.navigateByUrl('/login');
      }
      this.projects = Projects;
      if (this.pselected === null) {
        this.pselected = this.projects[0].name;
      }
      this.gettc(this.pselected);
    });
  }
  gettc(projectname) {
    this.designService.findtcinproject(projectname).then((Testcases: Array<Testcase>) => {
      if (Testcases.length > 0) {
        this.testcases = Testcases;
        if (this.tselected === null) {
          this.tselected = this.testcases[0].name;
          this.loadtc(this.testcases[0].name);
        }
        this.loadtc(this.tselected);
      }
    });
  }
  loadtc(tcname) {
    this.designService.findtestcasebyname(tcname).then((tc: Testcase) => {
      this.currenttc = tc;
      if (this.currenttc.designer === '') {
        this.currenttc.designer = this.util.getCookie(this.local.CURR_USER_EMAIL);
      }
      this.steps = this.currenttc.steps;
      this.stselected = this.currenttc.status;
    });
  }
  savetc(tcname, nstatus) {
    // tslint:disable-next-line:radix
    let newver = parseFloat(this.currenttc.tc_version) + 0.01;
    let body;
    if (this.currenttc.status !== '4' || this.role === '2') {
      switch (nstatus) {
        case '2':
          body = {
            name: tcname,
            tc_version: newver.toString(),
            status: nstatus,
            designer: this.util.getCookie(this.local.CURR_USER_EMAIL)
          };
          this.designService.updatetestcase(tcname, body).then().catch((e) => alert(e));
          break;
        case '3':
          body = {
            name: tcname,
            tc_version: newver.toString(),
            status: nstatus,
            designer: this.util.getCookie(this.local.CURR_USER_EMAIL)
          };
          this.designService.updatetestcase(tcname, body).then().catch((e) => alert(e));
          break;
        case '4':
          if (this.util.getCookie(this.local.CURR_USER_ROLE) !== '2') {
            alert('You do NOT have permission to review testcase');
          } else {
            // tslint:disable-next-line:radix
            newver = parseInt(this.currenttc.tc_version) + 1;
            body = {
              name: tcname,
              tc_version: newver.toString(),
              status: nstatus,
              designer: this.currenttc.designer,
              reviewer: this.util.getCookie(this.local.CURR_USER_EMAIL)
            };
            this.designService.updatetestcase(tcname, body).then().catch((e) => alert(e));
          }
          break;
        default:
          alert('You have no permission to update');
      }
      this.loadtc(this.tselected);
    } else {
      alert('Test case was approved so you can not change!');
    }
  }
  addstep(action, expected) {
    if (this.currenttc.status !== '4' || this.role === '2') {
      if (action.length === 0 || expected.length === 0) {
        alert('Please enter action and expected for new step');
      } else {
        const b = {
          action, expected
        };
        this.steps.push(new Step( action, expected));
        this.designService.addteststep(this.currenttc.name, b).then(_ => {
          const version = this.currenttc.tc_version + 0.01;
          this.savetc(this.currenttc.name, '2');
        });
        this.table.renderRows();
      }
      this.loadtc(this.tselected);
    } else {
      alert('Test case was approved so you can not change!');
    }
  }
  deleteRowData( ele ) {
    if (this.currenttc.status !== '4' || this.role === '2') {
      this.steps = this.steps.filter((value, key) => {
        return value._id !== ele._id;
      });
      this.designService.removeStep(this.currenttc._id, ele._id).then(_ => {
        const version = this.currenttc.tc_version + 0.01;
        this.savetc(this.currenttc.name, this.currenttc.status);
      });
      this.loadtc(this.tselected);
    } else {
      alert('Test case was approved so you can not change!');
    }
  }
  changeproject(p) {
    this.tselected = '';
    this.gettc(p);
  }


}
