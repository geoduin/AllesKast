import { Chapter } from "./Chapter"
import { Reaction } from "./Comment"
import { GUser, SiteUser } from "./User"

export interface IStory{
    //Are editable
    Id: string | undefined
    Title: string | null | undefined
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
