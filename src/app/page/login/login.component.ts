import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {
    this.loginForm = this.formBuilder.group({
       email : ['', Validators.required, Validators.email],
       password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  submit() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.signin(email, password)
        .then(() => alert('SignUp successful'))
        .catch((err) => alert('Can not register! ${err}'));
    }
  }
}
