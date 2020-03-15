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
    this.adminService.getalluser().then((Users: Array<User>) => {
      console.dir(Users);
      this.users = Users;
    });
  }

}
