import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../services/util.service';
import { AuthService } from '../services/auth.service';

/*
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router,public util:UtilService) { }
   */
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  */
 /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.util.getCookie('tcm-logged-in-user-role')) {
    return true;
  }

  this.router.navigate(['login']);
  return false;
}
  
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }}
  */
