import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(msg: any)   { console.log(msg); }
  info(msg: any)  { console.log(msg); }
  error(msg: any, err: object = {}) { console.error(msg, err); }
  warn(msg: any)  { console.warn(msg); }
}
