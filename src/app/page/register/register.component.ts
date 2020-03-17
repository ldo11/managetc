import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {
    this.registerForm = this.formBuilder.group({
      email : ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      this.authService.signup(email, password)
        .then()
        .catch((err) => alert('Can not register! ${err}'));
    }
  }


}
