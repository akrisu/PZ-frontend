import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../interfaces/Credentials.interface';
import { UserService } from '../../services/user/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
    });
  }

  public login(model: Credentials, isValid: boolean): void {
    this.submitted = true;

    if (isValid) {
      this.userService.login(model);
    }
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
