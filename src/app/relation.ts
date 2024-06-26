import {ProfileFull} from "./profile-full";

export interface Relation {
  id: number,
  userA: ProfileFull,
  userB: ProfileFull
}
