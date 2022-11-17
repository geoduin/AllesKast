import { IStory, Story } from "./Story.domain"

export enum Roles{
    Guest = "Guest",
    Regular = "Regular",
    Admin = "Admin"
}

export interface IUser {
    Id: string |  null | undefined
    UserName: string | null | undefined
    DateOfBirth: Date | null| undefined
    Email: string | null | undefined
    Role: string | null| undefined
}

export class User implements IUser{
    Id: string | null | undefined
    UserName: string | null | undefined
    DateOfBirth: Date| null 
    Email: string | null | undefined
    Password: string | null| undefined
    Role: string | null

    Followers: User[] = []
    //Note: Will be decided if user will hold the whole story, partial or only the ids.
    FollowedStories: Story[] = []
    //User will have references to his own published stories
    PublishedStories: string[] = []

    constructor(name: string, DateOfBirth: Date, Password: string, Email: string){
        this.UserName = name;
        this.DateOfBirth = DateOfBirth;
        this.Password = Password;
        this.Role = "User"
        this.Email = Email;
    }

}

//General user model
export interface GUser{
    Id: string| undefined
    UserName : string | undefined
    DateOfBirth: Date| undefined
    Email: string| undefined
    Role: string| undefined
}

//User interface with password
export interface IdentityUser extends GUser {
    Password: string | undefined
}

//User object that only his own can see. Used to edit object. 
export class PrivateUser implements IdentityUser{
    Id: string | undefined
    UserName: string | undefined
    Password: string | undefined
    Email: string | undefined
    Role: string | undefined
    DateOfBirth: Date | undefined

    Follow: SiteUser[] = []
    FollowedStories: IStory[] = []
}

//The user object that everybody can see. Used to see own and other users.
export class SiteUser implements GUser{
    Id: string | undefined
    UserName: string | undefined
    DateOfBirth: Date | undefined
    Email: string | undefined
    Role: string | undefined

    Follow: SiteUser[] = []
    FollowedStories: IStory[] = []
}