import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "./common/global-constants";
import {HttpHeaders} from "@angular/common/http";
import {Channel} from "./channel";
import {Router} from "@angular/router";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {


  constructor(private http:HttpClient, private router: Router) {
  }

  getAllChannels(){
    return this.http.get(GlobalConstants.baseUrl+"channel/showAll")
  }


  createChannel(channelName : Channel){
    this.http.post(GlobalConstants.baseUrl+'channel/create',channelName).subscribe({
      next: (channelFromFetch)=>{
        console.log(channelFromFetch)
      }
    })

    setTimeout(()=>{this.router.navigateByUrl("channels")},1000)
  }


  getOneChannelById(id: number){
    return this.http.get(GlobalConstants.baseUrl+`channel/show/${id}`)
  }

  removeOneChannel(id:number){
    return this.http.delete(GlobalConstants.baseUrl+`channel/remove/${id}`).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }


  joinChannel(id:number){
    this.http.post(GlobalConstants.baseUrl+`channel/join/${id}`,id).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

  leaveChannel(id: number) {
    this.http.post(GlobalConstants.baseUrl+`channel/leave/${id}`,id).subscribe({
      next:(data)=>{
        if (data == "Vous ne pouvez pas quitter avant d'avoir promu un nouveau propriétaire"){
          GlobalConstants.errorStatus = data.toString()
        }
      }
    })
  }

  sendMessage(channelId: number, message: Message) {
    this.http.post(GlobalConstants.baseUrl+`channel/message/create/${channelId}`,message).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }


}
