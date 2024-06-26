import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {FormsModule} from "@angular/forms";
import {User} from "../user";
import {NgIf} from "@angular/common";
import {GlobalConstants} from "../common/global-constants";

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {

  userService: UserService = inject(UserService)
  username:string = ""
  password:string = ""
  email:string= ""
  activeRoute: string
  typePassword: string = "password"

  constructor(private router:Router) {
    this.activeRoute = this.router.url
  }

  createUserObject(username:string,password:string, email:string){
    let user:User ={
      username: username,
      password: password,
      email: email
    }
    return user
  }

  register(user:User){
    this.userService.registerUser(user)
  }

  login(user:User){
    this.userService.loginUser(user)
  }


  exchangePasswordType(){
    if (this.typePassword == "password"){
      this.typePassword = "text"
    }else {
      this.typePassword = "password"
    }
  }

}
