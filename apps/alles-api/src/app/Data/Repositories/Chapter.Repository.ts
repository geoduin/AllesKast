import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chapter, ChapterSchema, Page } from "../Schema/PageSchema";
import { Story } from "../Schema/Story.Schema";



export class ChapterRepository{
    constructor(
        @InjectModel(Chapter.name) private Chapters: Model<Chapter>, 
        @InjectModel(Story.name) private Stories: Model<Story>){}


    async AddChapterToStory(Id:string, Chapter: Chapter){
        console.log("Chapter creation started");
        console.log(Chapter);
            const push = {$push: { ChapterList: Chapter } };
            const returnNew = {new: true};
            //Voegt een hoofdstuk toe in de hoofdstukken collectie.
            Chapter.StoryId = Id;
            return await this.Chapters.create(Chapter);
            //return await this.Stories.findOneAndUpdate({StoryId: Id}, push, {returnNew});
        
    }

    async DeleteChapter(storyId: string, chapterId: string){
        //Filter
        const filter = {ChapterId : chapterId};

        //Command om object uit array te halen.
        const pull = { $pull: { ChapterList: {ChapterId: chapterId}}};

        //Zorgt ervoor dat geupdated object teruggegeven wordt.
        const returnNew = {new: true};
        return await this.Chapters.findOneAndRemove(filter, returnNew);
    }

   /*
    async DeletePages(Id: string){
        //Filter
        const filter = {ChapterId : Id};

        return await this.Pages.deleteMany(filter);
    }
*/
    async UpdateChapter(storyId:string, chapterId: string, updatedChapter: Partial<Chapter>){
        console.log("Update chapter started");
        const filter = {StoryId: storyId, "ChapterList.ChapterId": chapterId};
        console.log(filter);
        const UpdateSet = { 
            $set:
            { 
                "ChapterTitle": updatedChapter.ChapterTitle,
                "ChapterNr": updatedChapter.ChapterNr,
                "Page.ImageName": updatedChapter.ChapterPage?.ImageName,
                "Page.ComicImage": updatedChapter.ChapterPage?.ComicImage
            } 
        }
        const UpdatedResult = {new: true};
        return this.Chapters.findOneAndUpdate(filter, UpdateSet, UpdatedResult);
    }

  /*  async UpdatePages(chapterId: string, updatedChapter: Partial<Page[]>){
        //Filter
        const filter = {ChapterId : chapterId};
        console.log(await this.Pages.find(filter));
        console.log(filter);
        return await this.Pages.updateMany(filter, updatedChapter);
    }*/

    async GetChapterPages(storyId:string, chapterId: string){
        console.log("Get all chapters");
        const filter = {ChapterId: chapterId};
        const projection = {_id: 0, __v: 0};
        return await this.Chapters.findOne(filter, projection);
    }

    async GetAllChapters(storyId:string, WantImage: number){
        const filter = {StoryId: storyId};
        let projection = {};
        if(WantImage != 1){
            projection = {ChapterPage: 0};
        }
        
        return await this.Chapters.find(filter, projection);
    }
}