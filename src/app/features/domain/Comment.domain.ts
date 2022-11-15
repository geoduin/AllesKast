export class Comment{
    
    ChapterId: string| undefined
    UserId: string | undefined
    Content: string | undefined
    PublishDate: Date | undefined

    constructor(){
        this.PublishDate = new Date();
    }
}