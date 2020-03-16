import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {Project} from '../../models/project';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {User} from '../../models/user';
import {Step} from '../../models/step';
import {MatTable} from '@angular/material/table';
import {element} from 'protractor';

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
  pselected;
  tselected;
  no = 0;
  displayedColumns = ['Step', 'Action', 'Expected', 'Delete'];
  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  constructor(private projectService: ProjectsService, private designService: DesignService) { }

  ngOnInit(): void {
    const email = 'abc@gmail.com';
    this.projectService.findprojectbyemail(email).then((Projects: Array<Project>) => {
      this.pselected = Projects[1]._id;
      this.projects = Projects;
      this.loadtc(this.projects[1].name);
    });
  }
  loadtc(projectname) {
    console.log(projectname);
    this.designService.findtcinproject(projectname).then((Testcases: Array<Testcase>) => {
      this.testcases = Testcases;
      this.tselected = this.testcases[1]._id;
      this.currenttc = this.testcases[1];
      this.steps = this.currenttc.steps;
    });
  }
  addstep(action, expected) {
    const b = {
      action, expected
    };
    this.steps.push(new Step( action, expected));
    this.designService.addteststep(this.currenttc.name, b).then();
    this.table.renderRows();
  }
  deleteRowData( ele ) {
    this.steps = this.steps.filter((value, key) => {
      return value._id !== ele._id;
    });
    console.log(ele._id);
    this.designService.removestep(ele._id).then();
  }

}
