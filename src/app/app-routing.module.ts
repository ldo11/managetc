import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './page/admin/admin.component';
import {ProfileComponent} from './page/profile/profile.component';
import {ProjectComponent} from './page/project/project.component';
import {DesignComponent} from './page/design/design.component';
import {ExecutionComponent} from './page/execution/execution.component';
import {LoginComponent} from './page/login/login.component';
import {RegisterComponent} from './page/register/register.component';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';

const routes: Routes = [{ path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:email', component: ProfileComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'design', component: DesignComponent },
  { path: 'design/:p', component: DesignComponent },
  { path: 'design/:p/:tc', component: DesignComponent },
  { path: 'execution/:tc', component: ExecutionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
