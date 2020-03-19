
import { Router } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';

import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {MatTable} from '@angular/material/table';
import {Project} from '../../models/project';
import {FormControl} from '@angular/forms';
import {Testcase} from '../../models/testcase';
import {RtStorageService} from '../../services/rt-storage.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  currentuser;
  projects: Array<Project>;
  emails: Array<string>;
  displayedColumns = ['Project', 'Tester', 'ADDT', 'ATC'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  constructor(private local: RtStorageService,
              private util: UtilService,
              private router: Router,
              private projectService: ProjectsService,
              private designService: DesignService) { }

  ngOnInit(): void {
    this.currentuser = this.util.getCookie(this.local.CURR_USER_EMAIL);
    this.projectService.findallprojects().then((Projects: Array<Project>) => {
      this.projects = Projects;
      this.projectService.findallemail().then((Email: Array<string>) => {
        this.emails = Email;
      });
    });
  }
  add(p, email) {
    this.projectService.addtester(p, email).then(_ => this.loadproject());
  }
  loadproject() {
    this.projectService.findallprojects().then((Projects: Array<Project>) => {
      this.projects = Projects;
    });
  }
  addproject(p) {
    this.projectService.addproject(p).then(_ => this.loadproject());
  }
  gotoDesign(p) {
    const url = this.router.createUrlTree(['/design', p]);
    this.router.navigateByUrl(url);
  }
  addtc(p, tc) {
    this.designService.addtestcase(new Testcase(tc, p, this.currentuser))
      .then();
    const url = this.router.createUrlTree(['/design', p, tc]);
    this.router.navigateByUrl(url);
  }
}
