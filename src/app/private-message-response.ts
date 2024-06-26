import {ProfileFull} from "./profile-full";

export interface PrivateMessageResponse {
  id:number
  content:string
  author:ProfileFull
  date:Date
}
