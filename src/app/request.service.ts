import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "./common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http : HttpClient) { }

  getAllRequests() {
    return this.http.get(GlobalConstants.baseUrl+"request/all")
  }



  sendFriendRequest(id:number){
    return this.http.post(GlobalConstants.baseUrl+`request/send/${id}`,id).subscribe(
      {next:(data)=>{
          console.log(data)
        }}
    )
  }

  acceptFriendRequest(id:number){
    this.http.post(GlobalConstants.baseUrl+`request/accept/${id}`,id).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

  denyFriendRequest(id:number){
    this.http.post(GlobalConstants.baseUrl+`request/deny/${id}`,id).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }


  getAllRelationsFromUserId(userId: number) {
    return this.http.get(GlobalConstants.baseUrl+`relations/getRelations/${userId}`)
  }
}
