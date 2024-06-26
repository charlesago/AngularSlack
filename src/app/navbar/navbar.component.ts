import {Component, inject} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {GlobalConstants} from "../common/global-constants";
import {UserService} from "../user.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userService: UserService = inject(UserService)
  token = GlobalConstants.token
  protected readonly localStorage = localStorage;
  protected readonly GlobalConstants = GlobalConstants;

  constructor() {
    this.userService.getActualUser()
  }
}
