import {ProfileFull} from "./profile-full";

export interface UserFull {
  id: number,
  username: string,
  email:string,
  profile: ProfileFull
}
