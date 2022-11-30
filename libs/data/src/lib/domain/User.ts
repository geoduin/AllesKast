import { IStory, StoryDetail } from "./Story"

//General user model
//Used to list users in a list.
export interface GUser{
    _id: string| undefined
    UserName : string | undefined
    DateOfBirth: Date| undefined
    Email: string| undefined
    Role: string| undefined
}

//User interface with password
//Used to create new users.
export interface IdentityUser extends GUser {
    Password: string | undefined
}

//Used as edit user viewmodel class, during the user edit process.
export interface EditUserVM extends IdentityUser{
    PasswordConfirmation: string;
    EditPassword: boolean;
}

//User object that only his own can see. Used to edit object. 
//@Used for profile editing.
export class PrivateUser implements IdentityUser{
    _id: string | undefined
    UserName: string | undefined
    Password: string | undefined
    Email: string | undefined
    Role: string | undefined
    DateOfBirth: Date | undefined

    Follow: SiteUser[] = []
    FollowedStories: IStory[] = []
}

//The user object that everybody can see. Used to see own and other users.
//@Used for profile and user details
export class SiteUser implements GUser{
    _id: string | undefined
    UserName: string | undefined
    DateOfBirth: Date | undefined
    Email: string | undefined
    Role: string | undefined

    constructor(id: string, name: string, DateOfBirth: Date, Email: string, Role: string ){
        this._id = id;
        this.DateOfBirth = DateOfBirth;
        this.Email = Email;
        this.UserName = name;
        this.Role;
    }

    Follow: any[] = []
    FollowedStories: IStory[] = []
}

//Writer class to hold values to put in during the story creation
export class Writer implements GUser{
    _id: string | undefined
    UserName: string | undefined
    DateOfBirth: Date | undefined
    Email: string | undefined
    Role: string | undefined
}
