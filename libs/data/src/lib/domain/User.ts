import { IStory, StoryDetail } from "./Story"

//General user model
export interface GUser{
    _id: string| undefined
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

    Follow: SiteUser[] = []
    FollowedStories: IStory[] = []
}