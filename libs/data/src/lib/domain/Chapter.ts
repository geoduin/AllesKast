import { ChapterPage } from "./Page"

//Abstract chapter interface
export interface IChapter {
    Id: string
    ChapterTitle:string
    PublishDate: Date
    ChapterNr: number
}

//Chapter 
export interface IFullChapter extends IChapter{
    _id: string;
}

export interface ChapterDetails extends IFullChapter{
    ChapterPage: ChapterPage | undefined
    ChapterPages: ChapterPage[] | undefined
}


export class Chapter implements IChapter{
    Id!: string
    ChapterTitle:string
    PublishDate: Date
    ChapterNr: number
    //Moet nog besloten worden of er maar 1 of meerdere paginas opgeslagen wordt.
    //ChapterPage: ChapterPage | undefined
    ChapterPages: ChapterPage[] = []
    Comic: ChapterPage | undefined;
    
    constructor(Title: string, Chapter: number){
        this.ChapterTitle = Title;
        this.ChapterNr = Chapter;
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