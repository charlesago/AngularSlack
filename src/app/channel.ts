import {UserFull} from "./user-full";
import {Message} from "./message";
import {ProfileFull} from "./profile-full";

export interface Channel {
  id:number,
  name: string,
  channelMessages : Message[]
  channelMembers : ProfileFull[]
  channelAdminMembers : UserFull[]
  ownerId:number
}
