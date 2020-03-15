import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }

    const storageValue = typeof value === 'string' ? value : JSON.stringify(value);
    document.cookie = name + '=' + (storageValue || '')  + expires + '; path=/';
  }

  getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }

    return null;
  }

  eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  cleanCookie() {
    this.eraseCookie('bob-usr-login');
    this.eraseCookie('bob-usr-token');
  }
}
