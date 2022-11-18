export interface IComment{
    ChapterId: string| undefined | null
    UserId: string | undefined | null
    Title: string | undefined | null
    Content: string | undefined | null
    PublishDate: Date | undefined | null
}

export class Reaction implements IComment{
    
    ChapterId: string| undefined
    UserId: string | undefined
    Content: string | undefined
    PublishDate: Date | undefined
    Title: string | null | undefined
    constructor(chapterId:string, userId: string,title: string, content: string){
        this.PublishDate = new Date();
        this.ChapterId = chapterId;
        this.UserId = userId;
        this.Content = content;
        this.Title = title;
    }
    

}

