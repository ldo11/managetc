import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile';
import {ProjectsService} from '../../services/project.service';
import {Project} from '../../models/project';
import { RtStorageService } from '../../services/rt-storage.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // binding
  email: string; // to get param from url
  profile: Profile;
  projects: Array<Project>;
  allproject: string;
  role: string;


  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectsService,
              private local: RtStorageService,
              private util: UtilService) {

  }

  ngOnInit(): void {
    // how to get param
    this.email = this.util.getCookie(this.local.CURR_USER_EMAIL);
    // call load data
    this.onLoadData(this.email);
  }// end_ngOnInit

  onUpdateProfile(email, name, phone) {
    this.profileService.updateprofile(email, name, phone).then(_ => {
      alert('Updated successful');
    });
  }

  onLoadData(email) {
    this.profileService.findprofile(email).then((profile: Profile) => {
      this.profile = profile;
    });

    this.projectService.findprojectbyemail(email, '1').then( (Projects: Array<Project>) => {
      this.projects = Projects;
      console.dir(this.projects);

      let str = '';
      this.projects.forEach( function(e) {
          str = str + ' ; ' + e.name;
          return str;
      });
      const len = str.length;
      str = str.substr(2, len - 2);
      this.allproject = str;
    });
  }// end_onLoadData()

  onSelectedFile(event) {
    console.log(event);
  }// onSelectedFile

  onUploadFile() {

  }// onUploadFile
}
