import {PrivateMessage} from "./private-message";
import {ProfileFull} from "./profile-full";

export interface Conversation {
  id: number;
  privateMessages: PrivateMessage[]
  relatedToProfileA: ProfileFull
  relatedToProfileB: ProfileFull
}
