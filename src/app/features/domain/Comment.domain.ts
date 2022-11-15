export class Reaction{
    
    ChapterId: string| undefined
    UserId: string | undefined
    Content: string | undefined
    PublishDate: Date | undefined

    constructor(chapterId:string, userId: string, content: string){
        this.PublishDate = new Date();
        this.ChapterId = chapterId;
        this.UserId = userId;
        this.Content = content;
    }
}