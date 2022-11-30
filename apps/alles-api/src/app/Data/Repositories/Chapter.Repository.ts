import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chapter, ChapterSchema, Page } from "../Schema/PageSchema";
import { Story } from "../Schema/Story.Schema";



export class ChapterRepository{
    constructor(
        @InjectModel(Page.name) private Pages: Model<Page>, 
        @InjectModel(Story.name) private Stories: Model<Story>){}


    async AddChapterToStory(Id:string, Chapter: Chapter){
        console.log("Chapter creation started");
        try {
            const push = {$push: { ChapterList: Chapter } };
            const returnNew = {new: true};
            return await this.Stories.findOneAndUpdate({StoryId: Id}, push, {returnNew});
        } catch (error) {
            return null;
        }
    }

    async AddPages(ChapterId: string, Pages: Page[]){
        try {
            let i = 1;
            Pages.forEach(page => {
                //Zet relatie tussen paginas en hoofdstuk
                page.ChapterId = ChapterId;
                //Voeg paginanummers toe aan paginas
                page.PageNr = i;
                i++;
            });
            return await this.Pages.insertMany(Pages);
        } catch (error) {
            return null;
        }
    }

    async DeleteChapter(storyId: string, chapterId: string){
        //Filter
        const filter = {StoryId : storyId};

        //Command om object uit array te halen.
        const pull = { $pull: { ChapterList: {ChapterId: chapterId}}};

        //Zorgt ervoor dat geupdated object teruggegeven wordt.
        const returnNew = {new: true};
        return await this.Stories.findOneAndUpdate(filter, pull, returnNew);
    }

    async DeletePages(Id: string){
        //Filter
        const filter = {ChapterId : Id};

        return await this.Pages.deleteMany(filter);
    }

    async UpdateChapter(storyId:string, chapterId: string, updatedChapter: Partial<Chapter>){
        console.log("Update chapter started");
        const filter = {StoryId: storyId, "ChapterList.ChapterId": chapterId};
        console.log(filter);
        const UpdateSet = { 
            $set:
            { 
                "ChapterList.$.ChapterTitle": updatedChapter.ChapterTitle,
                "ChapterList.$.ChapterNr": updatedChapter.ChapterNr 
            } 
        }
        const UpdatedResult = {new: true};
        return this.Stories.findOneAndUpdate(filter, UpdateSet, UpdatedResult);
    }

    async UpdatePages(chapterId: string, updatedChapter: Partial<Page[]>){
        //Filter
        const filter = {ChapterId : chapterId};
        console.log(await this.Pages.find(filter));
        console.log(filter);
        return await this.Pages.updateMany(filter, updatedChapter);
    }

    async GetChapterPages(storyId:string, chapterId: string){
        console.log("Get all chapters");
        const filter = {ChapterId: chapterId};
        const projection = {_id: 0, __v: 0};
        return await this.Pages.find(filter, projection);
    }
}