import { Chapter } from "./Chapter.domain"
import { Reaction } from "./Comment.domain"
import { User } from "./User.domain"

export class Story{
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

    //Lists of Story domain, cannot be edited by writer
    Rating: number[] = []
    CommentSection: Reaction[] = []
    Followers: User[] = []
    
    constructor(title: string, storyline: string, IsAdult: boolean, publishDate: Date){
        this.Title = title;
        this.StoryLine = storyline;
        this.IsAdultOnly = IsAdult;
        this.PublishDate = publishDate;
    }
    //Average of given ratings
    GetRating(): number{
        return 5;
    }
    //Once per user.
    SubmitRating(rate: number): boolean{
        try{
            this.Rating.push(rate);
            return true;
        }catch(error){
            return false;
        }
    }

    AddChapterToStory(Chapter: Chapter): boolean{
        try {
            this.ChapterList.push(Chapter);
            return true;
        } catch (error) {
            return false;
        }
    }

    FollowStory(User: User): boolean{
        try {
            this.Followers.push(User);
            return true;
        } catch (error) {
            return false;
        }
    }

    AddComment(Comment: Reaction){
        try {
            this.CommentSection.push(Comment);
            return true;
        } catch (error) {
            return false;
        }
    }
}