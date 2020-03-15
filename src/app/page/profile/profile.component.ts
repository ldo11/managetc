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
    const email:string = 'abc@gmail.com';
    this.profileService.findprofile(email).then((profile: Profile) =>{
        profile.name = this.profileForm.value.name;
        profile.email = email;
        this.profileForm.value.email = email;
        console.dir(this.profileForm.value);
    });
  }

}
