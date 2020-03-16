import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //binding
  profileForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      role: new FormControl(''),
      project: new FormControl(''),
      avatar: new FormControl(''),
  });

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
  }

  onGetProfileDetail(){
    const email = this.profileForm.value.email;
    this.profileService.findprofile(email).then((profile: Profile) =>{
        console.dir(profile);
        console.dir(this.profileForm);
    });
  }

}
