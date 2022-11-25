import { Chapter } from "./Chapter"
import { Reaction } from "./Comment"
import { ImageHolder } from "./Image"
import { GUser, SiteUser } from "./User"

export const GenreList = ["Romantiek", "Actie", "Mysterie",  "Non-Fictie", "Comedie", "Crime", "Supernatuurlijk", "Slice Of Life", "18+", "Sport", "Kinderen", "Jongvolwassen"]

export interface IStory{
    //Are editable
    StoryId: string | undefined
    Title: string | null | undefined
    StoryLine: string | undefined
    Writer: GUser | undefined
    IsAdultOnly: boolean | undefined
    Genres: string | undefined
    PublishDate: Date | undefined
    Thumbnail: ImageHolder | undefined
}

export interface StoryDetail extends IStory{
    //Misschien een thumbnail.
    
    ChapterList: Chapter[]| undefined
    CommentSection: Reaction[] | undefined
    Followers: GUser[] | undefined
}