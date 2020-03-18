import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RtStorageService } from '../../services/rt-storage.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  constructor(private util: UtilService, private local: RtStorageService, private route: Router, private formBuilder: FormBuilder, private authService: AuthService ) {
    this.loginForm = this.formBuilder.group({
       email : ['', Validators.required],
       password: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.Login(email, password);
      switch (this.util.getCookie(this.local.CURR_USER_ROLE)) {
        case '3': {
          this.route.navigateByUrl('admin')
          break;
        }
        case '2': {
          this.route.navigateByUrl('project')
          break;
        }
        case '1': {
          this.route.navigateByUrl('design')
          break;
        }
        default: {
          alert('Invalid email or password');
          this.route.navigateByUrl('login');
          break;
        }
      }
    }
  }
}
