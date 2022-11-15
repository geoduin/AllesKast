import { Chapter } from "./Chapter.domain"
import { User } from "./User.domain"

export class Story{
    //Are editable
    Id: string | undefined
    Title: string | undefined
    StoryLine: string | undefined
    Writer: User | undefined
    IsAdultOnly: boolean = false
    Genres: string[] = []
    ChapterList: Chapter[] = []
    //Misschien een thumbnail.

    //Lists of Story domain, cannot be edited by writer
    Rating: number[] = []
    CommentSection: Comment[] = []
    Followers: User[] = []
    
    constructor(){

    }
    //Average of given ratings
    GetRating(): number{
        return this.Rating.length;
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

    AddComment(Comment: Comment){
        try {
            this.CommentSection.push(Comment);
            return true;
        } catch (error) {
            return false;
        }
    }
}