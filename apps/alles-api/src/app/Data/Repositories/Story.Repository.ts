import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRepo } from "shared/entities";
import { Chapter } from "../Schema/PageSchema";
import { Story, StoryDocument } from "../Schema/Story.Schema";

@Injectable()
export class StoryRepository{

    constructor(@InjectModel(Story.name) private Stories: Model<StoryDocument>){
    }
    async GetOne(Id: string): Promise<Story | null| Story[]> {
        try {
            const filter = {StoryId: Id};
            const join = {
                from: "chapters",
                localField: "StoryId",
                foreignField: "StoryId",
                as: "ChapterList"
            }
            const result = this.Stories.aggregate(
                [{
                    $match: filter
                },
                {
                    $lookup: join
                },
                {   $limit: 1 },
                { $project: {"ChapterList.Page": 0}}
                ]
            )

            console.log(result);
            return result;
            //return this.Stories.findOne(filter);
        } catch (error) {
            return null;
        }
    }
    async Create(object: Story): Promise<unknown| unknown> {
       try {
        console.log(object);
         return this.Stories.create(object);
       } catch (error) {
        return error;
       }
    }
    async Update(Id: string, UpdatedElement: Partial<Story>): Promise<Story | null| unknown> {
        try {
            return this.Stories.findOneAndUpdate({StoryId: Id}, UpdatedElement, {new: true});
        } catch (error) {
            return error;
        }
    }
    async Delete(Id: string): Promise<boolean | unknown> {
        try {
            //TODO Transacties schrijven voor het verwijderen van hoofdstukken bij de verwijdering van een verhaal.

            return this.Stories.findOneAndDelete({StoryId: Id});
        } catch (error) {
            return false;
        }
    }
    async GetAll(): Promise<Story[]| unknown> {
        return this.Stories.find({}, { Writer: 0, Comments: 0, ChapterList: 0, __v: 0}).exec();
    }

    async GetStoryPerUser(UserId: string){
        return this.Stories.find({"Writer.Id": UserId}, {project: { Thumbnail: 0 }});
    }
}