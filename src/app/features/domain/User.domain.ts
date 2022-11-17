import { Story } from "./Story.domain"

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

export class IdentityUser implements IUser {
    Id: string | null | undefined
    UserName: string | null | undefined
    DateOfBirth: Date | null | undefined
    Email: string | null | undefined
    Role: string | null | undefined
    Password: string | undefined
}