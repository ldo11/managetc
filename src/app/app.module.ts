import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from './core/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './page/admin/admin.component';
import { ProfileComponent } from './page/profile/profile.component';
import { DesignComponent } from './page/design/design.component';
import { ExecutionComponent } from './page/execution/execution.component';
import { ProjectComponent } from './page/project/project.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'design', component: DesignComponent },
  { path: 'execution', component: ExecutionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProfileComponent,
    DesignComponent,
    ExecutionComponent,
    ProjectComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
