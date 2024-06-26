import {UserFull} from "../user-full";
import {ProfileFull} from "../profile-full";

export class GlobalConstants{


  public static token = localStorage.getItem("bearerToken")
  public static baseUrl: string = " https://messagerie.charlesagostinelli.com/api/"
  public static actualUser : UserFull
  public static actualProfile: ProfileFull
  public static errorStatus : string
  public static actualFriends : UserFull[]
  static actualFriendsAsString: string[] = []

}
