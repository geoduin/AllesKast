export class ChapterPage{
    ImageArray: ArrayBuffer

    constructor(bytes: ArrayBuffer){
        this.ImageArray = bytes;
    }

    GetImage64():string{
        try{
            let buffer = Buffer.from(this.ImageArray);
            return 'data:image/png;base64, ' + buffer.toString('base64');
        } catch(Error){
            return 'assets/staticImages/Placeholder Image.png';
        }
        
    }
}