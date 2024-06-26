import {Component, inject} from '@angular/core';
import {UserFull} from "../user-full";
import {UserService} from "../user.service";
import {NgForOf, NgIf} from "@angular/common";
import {GlobalConstants} from "../common/global-constants";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ChannelService} from "../channel.service";
import {RequestService} from "../request.service";
import {relative} from "@angular/compiler-cli";
import {Relation} from "../relation";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  users : UserFull[] = []
  userService : UserService = inject(UserService)
  channelService : ChannelService = inject(ChannelService)
  requestService : RequestService = inject(RequestService)
  route : ActivatedRoute = inject(ActivatedRoute)
  relationId !: number;

  constructor() {
    this.getFriends()
    let id = this.route.snapshot.params["id"]
    if (this.route.snapshot.url.length == 3){
      this.getUsersFromChannel(parseInt(this.route.snapshot.url[2].path))
    }else if (this.route.snapshot.url[1] != null
      && this.route.snapshot.url[1].path == "getFriends"){
      this.users = GlobalConstants.actualFriends
    } else if (id){
      this.getOneUser(id)
    }else{
      this.getAllUsers()
    }

  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({next:(usersFromFetch: any)=>{
        for (let i = 0; i < usersFromFetch.length;i++){
          let newUser : {
            profile: {
              lastName: any;
              visibility: any;
              name: any;
              id: any;
              requests: any;
              relations: any;
              relatedTo: any
            };
            id: any;
            username: any
          } ={
            id: usersFromFetch[i].id,
            username: usersFromFetch[i].username,
            profile: {
              id: usersFromFetch[i].profile.id,
              name: usersFromFetch[i].profile.name,
              lastName: usersFromFetch[i].profile.lastName,
              requests: usersFromFetch[i].requests,
              visibility: usersFromFetch[i].profile.visibility,
              relations: usersFromFetch[i].profile.relations,
              relatedTo: usersFromFetch[i].profile.relatedTo
            }
          }
          this.users.push(<UserFull>newUser)
        }
      }})
  }

  getOneUser(id:number){
    this.userService.getOneUser(id).subscribe({next:(userFromFetch: any)=>{
        let newUser: {
          profile: {
            lastName: any;
            visibility: any;
            name: any;
            id: any;
            requests: any;
            relations: any;
            relatedTo: any
          };
          id: any;
          username: any
        }= {
          id: userFromFetch.id,
          username: userFromFetch.username,
          profile: {
            id: userFromFetch.profile.id,
            name: userFromFetch.profile.name,
            lastName: userFromFetch.profile.lastName,
            requests: userFromFetch.requests,
            visibility: userFromFetch.profile.visibility,
            relations: userFromFetch.profile.relations,
            relatedTo: userFromFetch.profile.relatedTo
          }
        }
        this.users.push(<UserFull>newUser)
      }})
  }

  getFriends() {
    this.userService.getFriends()
  }


  getUsersFromChannel(id: number){
    this.channelService.getOneChannelById(id).subscribe({next:(userFromChannel: any)=>{
        for (let i = 0; i < userFromChannel.length;i++){
          let newFriend : {
            profile: {
              lastName: any;
              visibility: any;
              name: any;
              id: any;
              requests: any;
              relations: any;
              relatedTo: any
            };
            id: any;
            username: any
          } ={
            id: userFromChannel[i].id,
            username: userFromChannel[i].username,
            profile: {
              id: userFromChannel[i].profile.id,
              name: userFromChannel[i].profile.name,
              lastName: userFromChannel[i].profile.lastName,
              requests: userFromChannel[i].requests,
              visibility: userFromChannel[i].profile.visibility,
              relations: userFromChannel[i].profile.relations,
              relatedTo: userFromChannel[i].profile.relatedTo
            }
          }
          this.users.push(<UserFull>newFriend)
        }
        console.log(this.route.snapshot.url)
      }})
  }


  sendFriendRequest(id:number){
    this.requestService.sendFriendRequest(id)
  }

  createConversation(id:number){
    this.userService.createConversationFromId(id)
  }

  getRelationIdFromUserAndRemoveIt(user :UserFull):number{
    let actualUserUsername = GlobalConstants.actualUser.id

    for (let j=0;j<1;j++){
      this.requestService.getAllRelationsFromUserId(actualUserUsername).subscribe({
        next: (relationsFromFetch: any) => {
          for (let i = 0; i < relationsFromFetch.length; i++) {
            if (relationsFromFetch[i].userA.relatedTo.username == GlobalConstants.actualUser.username
              && relationsFromFetch[i].userB.relatedTo.username == user.username
              || relationsFromFetch[i].userB.relatedTo.username == GlobalConstants.actualUser.username
              && relationsFromFetch[i].userA.relatedTo.username == user.username) {
              console.log(relationsFromFetch[i].id)
              this.relationId = relationsFromFetch[i].id;
              this.userService.removeFriend(this.relationId)
              return true
            }
          }
          return false;
        }
      })

      this.requestService.getAllRelationsFromUserId(user.id).subscribe({
        next:(relationsFromFetch:any)=>{
          for (let i=0;i<relationsFromFetch.length;i++){
            if (relationsFromFetch[i].userA.relatedTo.username == GlobalConstants.actualUser.username
              && relationsFromFetch[i].userB.relatedTo.username == user.username
              || relationsFromFetch[i].userB.relatedTo.username == GlobalConstants.actualUser.username
              && relationsFromFetch[i].userA.relatedTo.username == user.username){
              console.log(relationsFromFetch[i].id)
              this.relationId = relationsFromFetch[i].id
              this.userService.removeFriend(this.relationId)
              return true
            }
          }
          return false
        }
      })
    }

    setTimeout(()=>{window.location.reload()},500)
    return this.relationId
  }


  protected readonly GlobalConstants = GlobalConstants;



}
