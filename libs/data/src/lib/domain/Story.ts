import { Chapter } from "./Chapter"
import { Reaction } from "./Comment"
import { ImageHolder } from "./Image"
import { GUser, SiteUser } from "./User"

export interface IStory{
    //Are editable
    StoryId: string | undefined
    Title: string | null | undefined
    StoryLine: string | undefined
    Writer: GUser | undefined
    IsAdultOnly: boolean | undefined
    Genres: string | undefined
    PublishDate: Date | undefined
    Thumbnail: ImageHolder
}

export interface StoryDetail extends IStory{
    //Misschien een thumbnail.
    
    ChapterList: Chapter[]| undefined
    CommentSection: Reaction[] | undefined
    Followers: GUser[] | undefined
}