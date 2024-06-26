import { Routes } from '@angular/router';
import {UserManagerComponent} from "./user-manager/user-manager.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

export const routes: Routes = [

  {
    path: "register", component: UserManagerComponent
  },
  {
    path: "login", component: UserManagerComponent
  },
  {
    path: "users", component: UserDetailComponent
  },
  {
    path: "profile/:id", component: UserDetailComponent
  },
  {
    path: "profile/getFriends", component: UserDetailComponent
  },
  {
    path: "channel/users/:id", component: UserDetailComponent
  },
  {
    path: "conversations/users/:id", component: UserDetailComponent
  }
];
