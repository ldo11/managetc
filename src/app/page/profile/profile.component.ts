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


  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //how to get param

    //call load data

  }

  onSubmit(value:any){
    const newName = value.name;
    const newPhone = value.phone;
    const newAvatar = value.avatar;
    this.profileService.updateprofile('email',newName,newPhone,newAvatar);
  }

  onLoadData() {
    const email:string= 'abc@gmail.com';
    this.profileService.findprofile(email).then((profile: Profile) =>{
        console.dir(profile);

    });
  }

}
