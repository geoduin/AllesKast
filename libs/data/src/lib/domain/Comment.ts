export interface IComment{
    CommentId: string | undefined
    UserId: string
    Username: string
    Title: string
    Content: string
    PublishDate: Date
}

export interface ICommentFull{
    _id: string;
}

export class Reaction implements ICommentFull{
    _id: string
    StoryId: string
    UserId: string
    Content: string 
    PublishDate: Date
    Title: string
    constructor(chapterId:string, userId: string,title: string, content: string){
        this._id = "";
        this.PublishDate = new Date();
        this.StoryId = chapterId;
        this.UserId = userId;
        this.Content = content;
        this.Title = title;
    }
    
    

}