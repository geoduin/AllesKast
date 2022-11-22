import { Chapter } from "./Chapter"
import { Reaction } from "./Comment"
import { GUser, SiteUser } from "./User"

export interface IStory{
    //Are editable
    Id: string | undefined
    Title: string | null
    StoryLine: string | undefined
    Writer: GUser | undefined
    IsAdultOnly: boolean | undefined
    Genres: string | undefined
    PublishDate: Date | undefined

}

export interface StoryDetail extends IStory{
    //Misschien een thumbnail.
    
    ChapterList: Chapter[]| undefined
    CommentSection: Reaction[] | undefined
    Followers: GUser[] | undefined
}

export class Story implements IStory{
    //Are editable
    Id: string | undefined
    Title: string | null
    StoryLine: string | undefined
    Writer: GUser | undefined
    IsAdultOnly: boolean = false
    Genres: string | undefined
    PublishDate: Date | undefined

    ChapterList: Chapter[] = []
    //Misschien een thumbnail.
    CommentSection: Reaction[] = []
    Followers: GUser[] = []
    
    constructor(title: string, storyline: string, IsAdult: boolean, publishDate: Date){
        this.Title = title;
        this.StoryLine = storyline;
        this.IsAdultOnly = IsAdult;
        this.PublishDate = publishDate;
    }
}