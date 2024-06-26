import { Injectable } from '@angular/core';
import {GlobalConstants} from "./common/global-constants";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http : HttpClient, private router:Router) { }


  getAllConversationsFromActualUser(){
    return this.http.get(GlobalConstants.baseUrl+"private/conversation/showConversations")
  }


  sendMessage(conversationId: number, message: Message) {
    this.http.post(GlobalConstants.baseUrl+`private/message/send/${conversationId}`,message).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

  getOneConversationFromId(id: number) {
    return this.http.get(GlobalConstants.baseUrl+`private/conversation/show/${id}`)
  }
}
