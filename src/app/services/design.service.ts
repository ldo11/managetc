import { Injectable } from '@angular/core';
import {LogService} from './log.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(private logger: LogService,
              private httpService: HttpService) {

}

removestep(id) {
  const url = 'design/' + id;
  const body = {};
  return this.httpService.sendDeleteRequest(url);
}
findtcinproject(projectname) {
  const url = 'design/p/' + projectname;
  const body = {};
  return this.httpService.sendGetRequest(url, body);
}


findtestcasebyname(tcname) {
  const url = 'design/n/' + tcname;
  const body = {};
  return this.httpService.sendGetRequest(url, body);
}


addtestcase(testcasedetail) {
  const url = 'design';
  return this.httpService.sendPostRequest(url, testcasedetail);
}


updatetestcase(name, body) {
  const url = 'design/update/' + name;
  return this.httpService.sendPostRequest(url, body);
}

addteststep(name, body) {
  const url = 'design/addstep/' + name;
  return this.httpService.sendPostRequest(url, body);
}


updateteststep(id, action, expected) {
  const url = 'design/updatestep/' + id;
  const body = {action,
  expected};
  return this.httpService.sendPostRequest(url, body);
}


}






