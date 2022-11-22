import { ChapterPage } from "./Page"

export interface IChapter {
    Id: string | undefined
    ChapterTitle:string| undefined
    PublishDate: Date| undefined
    Chapter: number | undefined
    
    
    //Moet nog besloten worden of er maar 1 of meerdere paginas opgeslagen wordt.
    /*ChapterPages: ChapterPage[] | undefined
    //ChapterPage: ChapterPage | undefined
    Comic: ChapterPage | undefined;*/
}

export interface ChapterDetails extends IChapter{
    ChapterPage: ChapterPage | undefined
    ChapterPages: ChapterPage[] | undefined
}


export class Chapter implements IChapter{
    Id: string | undefined
    ChapterTitle:string| undefined
    PublishDate: Date| undefined
    Chapter: number | undefined
    //Moet nog besloten worden of er maar 1 of meerdere paginas opgeslagen wordt.
    //ChapterPage: ChapterPage | undefined
    ChapterPages: ChapterPage[] = []
    Comic: ChapterPage | undefined;
    
    constructor(Title: string, Chapter: number){
        this.ChapterTitle = Title;
        this.Chapter = Chapter;
        this.PublishDate = new Date();
    }

    AddPages(page: ChapterPage){
        this.ChapterPages.push(page);
    }

    AssignComicToChapter(Comic: ChapterPage){
        this.Comic = Comic;
    }

    GetComic():string{
        if(this.Comic){
            return this.Comic.GetImage64();
        } else{
            console.warn('Comic is absent');
            return 'data:image/png;base64, assets/staticImages/Placeholder Image.png';
        }
    }
}