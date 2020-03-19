import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from './core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
    UserrolePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
