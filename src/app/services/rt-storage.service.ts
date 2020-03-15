import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtStorageService {

  TOKEN_KEY = 'kappa-nwk-access-tk';
  TOKEN_TYPE_KEY = 'kappa-nwk-access-tk-type';
  LOGGEDIN_USER = 'kappa-nwk-logged-in-user';
  CURR_USER_ID = 'kappa-nwk-logged-in-user-id';
  CURR_LANG = 'kappa-nwk-lang';

  mData: Map<string, object>;

  constructor() {
    this.mData = new Map<string, object>();
  }

  setData(key: string, value: object) {
    this.mData[key] = value;
  }

  getData(key: string): object {
    return this.mData[key];
  }
}
