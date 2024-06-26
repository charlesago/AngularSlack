import {UserFull} from "./user-full";
import {Request} from "./request";
import {Relation} from "./relation";

export interface ProfileFull {
  id: number,
  name: string,
  lastName: string,
  requests: Request[],
  visibility: boolean,
  relations: Relation[]
  relatedTo: UserFull
}
