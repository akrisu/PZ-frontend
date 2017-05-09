import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  public isAdmin(): boolean {
    return this.userService.hasAdminRole();
  }

  public logout(): void {
    this.userService.logout();
  }

}
