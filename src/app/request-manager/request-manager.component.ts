import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {GlobalConstants} from "../common/global-constants";
import {RequestService} from "../request.service";
import {Request} from "../request";

@Component({
  selector: 'app-request-manager',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './request-manager.component.html',
  styleUrl: './request-manager.component.css'
})
export class RequestManagerComponent {

  requests: Request[] = []
  requestService: RequestService = inject(RequestService)

  constructor() {
    this.getAllRequests()
  }

  getAllRequests(){
    this.requestService.getAllRequests().subscribe({
      next:(requestsFromFetch:any )=>{
        console.log(requestsFromFetch)
        for (let i = 0; i< requestsFromFetch.length;i++){
          let newRequest : Request ={
            id: requestsFromFetch[i].id,
            recipient: requestsFromFetch[i].recipient,
            sender: requestsFromFetch[i].sender
          }
          this.requests.push(newRequest)
        }
        console.log(this.requests)
      }
    })
  }


  protected readonly GlobalConstants = GlobalConstants;
}
