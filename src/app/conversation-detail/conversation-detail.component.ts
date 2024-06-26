import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Conversation} from "../conversation";
import {MessageService} from "../message.service";
import {ConversationService} from "../conversation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-conversation-detail',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './conversation-detail.component.html',
  styleUrl: './conversation-detail.component.css'
})
export class ConversationDetailComponent {

  conversation !: Conversation;
  messageService: MessageService = inject(MessageService)
  messageInput: string = ""
  conversationService: ConversationService = inject(ConversationService)
  route : ActivatedRoute = inject(ActivatedRoute)


  constructor() {
    if (this.route.snapshot.url[2]){
      let id : number = parseInt(this.route.snapshot.url[2].path)
      this.getOneConversationFromId(id)
    }
    console.log(this.conversation)

  }

  getOneConversationFromId(id:number){
    this.conversationService.getOneConversationFromId(id).subscribe({
      next:(conversationFromFetch:any)=>{
        console.log(conversationFromFetch)
        return this.conversation = {
          id: conversationFromFetch.id,
          privateMessages: conversationFromFetch.privateMessages,
          relatedToProfileA: conversationFromFetch.relatedToProfileA,
          relatedToProfileB: conversationFromFetch.relatedToProfileB,
        }
      }
    })
  }

  checkGroupMessageLength(){

  }
}
