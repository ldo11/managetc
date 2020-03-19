import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtStorageService {

  TOKEN_KEY = 'tcm-access-tk';
  TOKEN_TYPE_KEY = 'tcm-access-tk-type';
  LOGGEDIN_USER = 'tcm-logged-in-user';
  CURR_USER_ID = 'tcm-logged-in-user-id';
  CURR_USER_EMAIL = 'tcm-logged-in-user-email';
  CURR_USER_ROLE = 'tcm-logged-in-user-role';

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
