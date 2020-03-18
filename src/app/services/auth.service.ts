import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { RtStorageService } from './rt-storage.service';
import { UtilService } from './util.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private util: UtilService,
    private rtStorage: RtStorageService,private http: HttpClient) {

  }
  

  signup(email: string, password: string) {
    const url = 'users/create';
    const d = {email, password};
    return this.httpService.sendPostRequest(url, d);
  }

  Login(email: string, password: string) {

    const url = 'users/login';
    const d = {
      email,
      password
    };
    // return this.httpService.sendPostRequest(url, d);
    const http = this.httpService;

    return new Promise((resolve, reject) => {
      http.sendPostRequest(url, d).then((respData: any) => {
        if (respData && respData.token) {
          const token = respData.token;
          const userId = respData.id;
          const role = respData.role;
          const t = 30;
          this.util.setCookie(this.rtStorage.CURR_USER_ROLE, role, t);
          this.util.setCookie(this.rtStorage.TOKEN_KEY, token, t);
          this.util.setCookie(this.rtStorage.CURR_USER_ID, userId, t);
          this.util.setCookie(this.rtStorage.LOGGEDIN_USER, respData.user, t);
        }
        resolve(true);
      })
      .catch((err) => reject(err));
    });

  }


 /* public isAuthenticated(): boolean {
    const token =this.util.getCookie('tcm-logged-in-user-role');   
    // Check whether the token is expired and return
    // true or false
    console.log('the cookie is:'+token);
    return !this.jwtHelper.isTokenExpired(token);
  }
  */
  
  signOut() {

    return new Promise((resolve, reject) => {

      this.util.eraseCookie(this.rtStorage.LOGGEDIN_USER);
      this.util.eraseCookie(this.rtStorage.CURR_USER_ID);
      this.util.eraseCookie(this.rtStorage.TOKEN_KEY);


      setTimeout(resolve.bind(null, true), 100);
    });
  }

  getLoggedInUser(): User {
    // const loggedInUser = this.rtStorage.getData(this.rtStorage.LOGGEDIN_USER);
    const loggedInUserStr = this.util.getCookie(this.rtStorage.LOGGEDIN_USER);
    if (!loggedInUserStr || loggedInUserStr.length === 0) {
      return null;
    }

    const loggedInUser = JSON.parse(loggedInUserStr);

    return loggedInUser as User;
  }

  getToken(): string {

    return this.util.getCookie(this.rtStorage.TOKEN_KEY);
  }

  getLoggedInUserId(): number {
      const userIdText = this.util.getCookie(this.rtStorage.CURR_USER_ID);

      try {
          // tslint:disable-next-line:radix
          return parseInt(userIdText);
      } catch (e) {
          return -1;
      }
  }


}
