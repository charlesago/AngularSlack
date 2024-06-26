import {UserFull} from "./user-full";

export interface Message {
  id: number,
  author: {
    id:number,
    name: string | null,
    lastName: string | null,
    relatedTo: UserFull
  }
  content: string
}
