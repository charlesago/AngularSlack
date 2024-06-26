import {ProfileFull} from "./profile-full";
import {PrivateMessageResponse} from "./private-message-response";

export interface PrivateMessage {
  id:number
  author:ProfileFull
  content:string
  privateMessageResponses: PrivateMessageResponse[]
}
