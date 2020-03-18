import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate} from '@angular/router';
import { ProfileComponent } from './page/profile/profile.component';
import { LoginComponent } from './page/login/login.component';
/*import { 
  AuthGuardService as AuthGuard 
} from './guards/auth.guard';
*/

const routes: Routes = [];


/*export const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' }
];
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
