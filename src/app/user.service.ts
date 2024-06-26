import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { User } from './user';
import { UserFull } from './user-full';
import { Router } from '@angular/router';
import { GlobalConstants } from './common/global-constants';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Sending registration request', user);
    this.http.post(GlobalConstants.baseUrl + 'register', user, { headers }).pipe(
      catchError(this.handleError)
    ).subscribe({
      next: (data) => {
        console.log('Registration successful', data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registration error', error);
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError('Something went wrong; please try again later.');
  }

  loginUser(user:User){
    this.http.post(GlobalConstants.baseUrl+"login_check",user).subscribe({next:(data:any)=>{
        localStorage.setItem("bearerToken",data.token)
        this.router.navigateByUrl("/").then(r => console.log(r))
      }})
  }

  getAllUsers(){
    return this.http.get(GlobalConstants.baseUrl+"profile/showAll")
  }


  getOneUser(id: number) {
    return this.http.get(GlobalConstants.baseUrl+`profile/show/${id}`)
  }

  getActualUser(){

    this.http.get(GlobalConstants.baseUrl+"profile/getActual")
      .subscribe({next:(actualUserFromFetch:any)=>{
          GlobalConstants.actualUser = {
            id: actualUserFromFetch.id,
            username: actualUserFromFetch.username,
            email: actualUserFromFetch.email,
            profile: actualUserFromFetch.profile
          }
          console.log("Currently connected")
        }})
  }


  getFriends() {
    let friends:UserFull[]  =[]
    this.http.get(GlobalConstants.baseUrl+"relations/getFriends").subscribe({next:(userFromChannel: any)=>{
        for (let i = 0; i < userFromChannel.length;i++){
          let newFriend : UserFull ={
            id: userFromChannel[i].id,
            username: userFromChannel[i].username,
            email: userFromChannel[i].email,
            profile: {
              id: userFromChannel[i].profile.id,
              name: userFromChannel[i].profile.name,
              lastName: userFromChannel[i].profile.lastName,
              requests: userFromChannel[i].requests,
              visibility: userFromChannel[i].profile.visibility,
              relations: userFromChannel[i].profile.relations,
              relatedTo: userFromChannel[i].relatedTo
            }
          }
          friends.push(newFriend)
          GlobalConstants.actualFriendsAsString.push(newFriend.username)
        }
      }})
    GlobalConstants.actualFriends = friends
    return friends
  }

  isFriend(userUsername: string) {
    return GlobalConstants.actualFriendsAsString.includes(userUsername)
  }

  removeFriend(relationId: number) {
    this.http.delete(GlobalConstants.baseUrl+`relations/remove/${relationId}`).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

  createConversationFromId(id:number) {
    this.http.post(GlobalConstants.baseUrl+"private/conversation/create/"+id,id).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }
}
