
export interface IPage{
    ImageArray: ArrayBuffer

    GetImage64():string
}

export class ChapterPage implements IPage{
    ImageArray: ArrayBuffer

    constructor(bytes: ArrayBuffer){
        this.ImageArray = bytes;
    }

    GetImage64():string{
        /*try{
            let buffer = Buffer.from(this.ImageArray);
            return 'data:image/png;base64, ' + buffer.toString('base64');
        } catch(Error){
            return 'assets/staticImages/Placeholder Image.png';
        }*/
        return 'data:image/png;base64, assets/staticImages/Placeholder Image.png';
    }
}

export interface IntfPage{
    ComicImage: string;
}

//Zal gebruikt worden bij het lezen van een hoofdstuk.
export class ComicPage implements IntfPage{
    PageId!:string;
    StoryId!: string;
    ChapterId!: string;
    PageNr!: number;
    ComicImage!: string;
}