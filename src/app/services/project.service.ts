import { Injectable } from '@angular/core';
import {LogService} from './log.service';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private logger: LogService,
              private httpService: HttpService) {

  }


  addproject(name) {
    const url = 'project';
    const body = {name: name};
    return this.httpService.sendPostRequest(url, body);
  }


  findprojectbyid(projectid) {
    const url = 'project/' + projectid;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

  addtester(projectname) {
    const url = 'project/addtester';
    const body = {name: projectname};
    return this.httpService.sendPostRequest(url, body);
  }

  findalltesters(projectname) {
    const url = 'project/alltesters/' + projectname;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

}
