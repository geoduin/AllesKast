import { Story } from "./Story.domain"

export class User{
    Id: string | undefined
    Name: string | undefined
    DateOfBirth: Date| undefined
    Email: string | undefined
    Password: string | undefined
    Role: string | undefined

    Followers: User[] = []
    //Note: Will be decided if user will hold the whole story, partial or only the ids.
    FollowedStories: Story[] = []
    //User will have references to his own published stories
    PublishedStories: string[] = []

    constructor(name: string, DateOfBirth: Date, Password: string, Email: string){
        this.Name = name;
        this.DateOfBirth = DateOfBirth;
        this.Password = Password;
        this.Role = "User"
        this.Email = Email;
    }

}