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
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import { GrouptesterPipe } from './pipe/grouptester.pipe';
import {GroupProjectPipe} from './pipe/groupproject.pipe';
import { HeaderComponent } from './page/header/header.component';
import { UtilService } from './services/util.service';
import { UserstatusPipe } from './pipe/userstatus.pipe';
import { UserrolePipe } from './pipe/userrole.pipe';


const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:email', component: ProfileComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'design', component: DesignComponent },
  { path: 'design/:p', component: DesignComponent },
  { path: 'design/:p/:tc', component: DesignComponent },
  { path: 'execution/:tc', component: ExecutionComponent },
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
    PageNotFoundComponent,
    GrouptesterPipe,
    HeaderComponent,
    GroupProjectPipe,
    UserstatusPipe,
    UserrolePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule
    /*JwtModule.forRoot({
      config: {
        tokenGetter: (tokenGetter),
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/auth']
      }
    })
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  constructor(public util: UtilService) { }

}
