
import {Component, OnInit, ViewChild} from '@angular/core';

import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {MatTable} from '@angular/material/table';
import {Project} from '../../models/project';
import {FormControl} from '@angular/forms';
import {Testcase} from '../../models/testcase';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  currentuser = 'abc@gmail.com';
  Testerselect = new FormControl();
  projects: Array<Project>;
  emails: Array<string>;
  emailInproject: Array<string>;
  displayedColumns = ['Project', 'Tester', 'ADDT', 'ATC'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  constructor(private projectService: ProjectsService, private designService: DesignService) { }

  ngOnInit(): void {
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
  addtc(p, tc) {
    this.designService.addtestcase(new Testcase(tc, p, this.currentuser)).then();
  }
}
