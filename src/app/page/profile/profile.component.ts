import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //binding
  email: string; // to get param from url
  profile: Profile;

  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    //how to get param
    this.email = this.activatedRoute.snapshot.params['email'];
    //call load data
    this.onLoadData(this.email);
  }

  onSubmit(value:any){
    const newName = value.name;
    const newPhone = value.phone;
    const newAvatar = value.avatar;
    this.profileService.updateprofile(this.email,newName,newPhone,newAvatar);
  }

  onLoadData(email) {
    this.profileService.findprofile(email).then((profile: Profile) =>{
      this.profile = profile;
    });
  }

}
