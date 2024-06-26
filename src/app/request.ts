import {ProfileFull} from "./profile-full";

export interface Request {
  id: number,
  recipient: ProfileFull,
  sender: ProfileFull
}
