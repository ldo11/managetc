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

 findprojectbyemail(email, role) {
  const url = 'projects/e/' + email + '/' + role;
  const body = {};
  return this.httpService.sendGetRequest(url, body);
}

  addproject(name) {
    const url = 'projects';
    const body = {name};
    return this.httpService.sendPostRequest(url, body);
  }


  findprojectbyid(projectid) {
    const url = 'projects/' + projectid;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }
  findprojectbyname(projectName) {
    const url = 'projects/' + projectName;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }
  addtester(projectname, tester) {
    const url = 'projects/addtester/' + projectname;
    const body = {testeremail: tester};

    return this.httpService.sendPostRequest(url, body);
  }

  findalltesters(projectname) {
    const url = 'projects/alltesters/' + projectname;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

  findallemail() {
    const url = 'users/alluser/';
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

  findallprojects() {
    const url = 'projects/allprojects/';
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

}
