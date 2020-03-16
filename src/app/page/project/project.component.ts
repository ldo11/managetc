import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService  } from '../../services/project.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  testerList:Array<string>;
  

  projectForm: any;
  constructor(private formBuilder: FormBuilder, private projectService: ProjectsService ) {
    

}ngOnInit(): void {

  this.projectForm = this.formBuilder.group({
    name : ['', Validators.required],
    tester: ['', [Validators.required]]
  })
  this.projectService.findallemal().then((testers: Array<string>) => {
    this.testerList = testers;
    
    
  });
}
}
