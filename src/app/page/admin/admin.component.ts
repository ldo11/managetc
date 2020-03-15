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
  reload_user(){
    this.adminService.getalluser().then((Users: Array<User>) => {
      console.dir(Users);
      this.users = Users;
    })
  }
  activate(email){
    this.adminService.activateuser(email);
    this.reload_user();
  }

  deactivate(email){
    this.adminService.deactivateuser(email);
    this.reload_user();
  }
}
