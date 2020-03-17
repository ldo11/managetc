import { Injectable } from '@angular/core';
import {LogService} from './log.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private logger: LogService,
              private httpService: HttpService) {

  }
  getalluser() {
    const url = 'admin/alluser';
    return this.httpService.sendGetRequest(url, {});
  }
  activateuser(email) {


    const url = 'admin/activate/' + email;
    const body = {};

    return this.httpService.sendPostRequest(url, body);
  }
  deactivateuser(email) {
    const url = 'admin/deactivate/' + email;
    const body = {};
    return this.httpService.sendPostRequest(url, body);
  }

  changerole(email, role) {
    const url = 'admin/role/' + email;
    const body = {email, role};
    return this.httpService.sendPostRequest(url, body);
  }
}
