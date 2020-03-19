import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {User} from '../../models/user';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: Array<User>;
  constructor(
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.reload_user();

  }

  reload_user() {
    this.adminService.getalluser().then((Users: Array<User>) => {
      console.dir(Users);
      this.users = Users;
    });
  }
  changerole(email, role) {
    let nrole;
    if (role === 1) {
      nrole = 2;
    }
    if (role === 2) {
      nrole = 1;
    }
    if (confirm('Change ' + email + ' role ?')) {
        this.adminService.changerole(email, nrole).then(_ => {
          this.reload_user();
        });
    }
  }
  changestatus(curstatus, email) {
    if (confirm('Are you sure?')) {
      if (curstatus === 1) {
        this.adminService.deactivateuser(email).then(_ => {
          this.reload_user();
        });
      } else {
        this.adminService.activateuser(email).then(_ => {
          this.reload_user();
        });
      }
    }
  }
}
