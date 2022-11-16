import { Chapter } from "./Chapter.domain"
import { Reaction } from "./Comment.domain"
import { User } from "./User.domain"

export interface IStory{
    //Are editable
    Id: string | undefined
    Title: string | null
    StoryLine: string | undefined
    Writer: User | undefined
    IsAdultOnly: boolean | undefined
    Genres: string[] | undefined
    PublishDate: Date | undefined

    ChapterList: Chapter[]| undefined
    //Misschien een thumbnail.
    CommentSection: Reaction[] | undefined
    Followers: User[] | undefined

    /*
    GetRating(): number
    SubmitRating(rate: number): boolean
    AddChapterToStory(Chapter: Chapter): boolean
    */
}

export class Story implements IStory{
    //Are editable
    Id: string | undefined
    Title: string | null
    StoryLine: string | undefined
    Writer: User | undefined
    IsAdultOnly: boolean = false
    Genres: string[] | undefined
    PublishDate: Date | undefined

    ChapterList: Chapter[] = []
    //Misschien een thumbnail.
    CommentSection: Reaction[] = []
    Followers: User[] = []
    
    constructor(title: string, storyline: string, IsAdult: boolean, publishDate: Date){
        this.Title = title;
        this.StoryLine = storyline;
        this.IsAdultOnly = IsAdult;
        this.PublishDate = publishDate;
    }
}