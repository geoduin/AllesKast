import { ChapterPage } from "./ChapterPage.domain"

export class Chapter{
    Id: string | undefined
    ChapterTitle:string| undefined
    PublishDate: Date| undefined
    Chapter: number | undefined
    ChapterPages: ChapterPage[] = []

    constructor(){

    }

    AddPages(page: ChapterPage){
        this.ChapterPages.push(page);
    }
}