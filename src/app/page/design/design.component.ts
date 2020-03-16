import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {Project} from '../../models/project';
import {Testcase} from '../../models/testcase';
import {ProjectsService} from '../../services/project.service';
import {DesignService} from '../../services/design.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  projects: Array<Project>;
  testcases: Array<Testcase>;
  currenttc: Testcase;
  pselected;
  tselected;

  displayedColumns: string[] = ['position', 'Action', 'Expected'];
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
      this.tselected = this.testcases[0]._id;
      this.currenttc = this.testcases[0];
    });
  }

}
