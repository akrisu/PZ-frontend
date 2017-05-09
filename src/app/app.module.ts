import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerModule } from 'ng2-datepicker';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriverComponent } from './components/driver/driver.component';

import { UserService } from './services/user//user.service';
import { AdminPermissionService } from './services/adminPermission/adminpermission.service';
import { UserPermissionService } from './services/userPermission/userpermission.service';

import { UserRepository } from './repositories/UserRepository';
import { DriverRepository } from './repositories/DriverRepository';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    globalHeaders: [{'Content-Type':'application/json'}],
    noTokenScheme: true
  }), http, options);
}

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login component' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register component' }
  },
  {
    path: 'driver',
    component: DriverComponent,
    canActivate: [AdminPermissionService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserPermissionService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    NavComponent,
    DashboardComponent,
    DriverComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    DatePickerModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    UserService,
    AdminPermissionService,
    UserPermissionService,
    UserRepository,
    DriverRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
