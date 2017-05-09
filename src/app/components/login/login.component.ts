import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../forms/LoginForm';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: Credentials;

  constructor(
    private userService: UserService
  ) {
    this.loginForm = new Credentials();
  }

  ngOnInit() {
  }

  public login(): void {
    this.userService.login(this.loginForm);
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
