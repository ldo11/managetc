import { Injectable } from '@angular/core';
import {LogService} from './log.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private logger: LogService,
    private httpService: HttpService) {

}


findprofile(email){
  const url = 'profile/' + email;
  const body = {};
  return this.httpService.sendGetRequest(url,body);
}


updateprofile(email,name,phone,avatar){
  const url = 'profile';
  const body = {email:email,name:name,phone:phone,avatar:avatar};
  return this.httpService.sendPostRequest(url,body);
}

}