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

 findprojectbyemail(email) {
  const url = 'projects/e/' + email;
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

  addtester(projectname) {
    const url = 'projects/addtester';
    const body = {name: projectname};
    return this.httpService.sendPostRequest(url, body);
  }

  findalltesters(projectname) {
    const url = 'projects/alltesters/' + projectname;
    const body = {};
    return this.httpService.sendGetRequest(url, body);
  }

}
