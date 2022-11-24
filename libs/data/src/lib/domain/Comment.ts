export interface IComment{
    ChapterId: string
    UserId: string
    Title: string
    Content: string
    PublishDate: Date
}

export interface ICommentFull{
    _id: string;
}

export class Reaction implements ICommentFull{
    _id: string
    ChapterId: string
    UserId: string
    Content: string 
    PublishDate: Date
    Title: string
    constructor(chapterId:string, userId: string,title: string, content: string){
        this._id = "";
        this.PublishDate = new Date();
        this.ChapterId = chapterId;
        this.UserId = userId;
        this.Content = content;
        this.Title = title;
    }
    
    

}