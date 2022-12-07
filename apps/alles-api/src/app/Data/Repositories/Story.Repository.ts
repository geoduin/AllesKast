import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
            const result = await this.Stories.aggregate(
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
        //Voer wijzigingen door in neo4j.
        //Voer wijzigingen in database.
        return this.Stories.create(object);
       } catch (error) {
        return error;
       }
    }
    async Update(Id: string, UpdatedElement: Partial<Story>): Promise<Story | null| unknown> {
        try {
            //Voer wijzigingen door in neo4j.
            //Voer wijzigingen in database.
            return this.Stories.findOneAndUpdate({StoryId: Id}, UpdatedElement, {new: true});
        } catch (error) {
            return error;
        }
    }
    async Delete(Id: string): Promise<boolean | unknown> {
        try {
            //TODO Transacties schrijven voor het verwijderen van hoofdstukken bij de verwijdering van een verhaal.
            //Verwijder alle hoofdstukken.

            //Verwijder alle relaties in neo4j

            //Verwijder verhaal
            return this.Stories.findOneAndDelete({StoryId: Id});
        } catch (error) {
            return false;
        }
    }
    async GetAll(): Promise<Story[]| unknown> {
        return this.Stories.find({}, { Writer: 0, Comments: 0, ChapterList: 0, __v: 0}).exec();
    }

    async GetRecommended(StoryIdList: string[]){
        const query = {_id: { $in: StoryIdList}};
        const results = this.Stories.find(query, {ChapterList: 0}, {})
        return results;
    }

    //Only used to authorize
    async GetOneBasic(Id: string): Promise<any>{
        const filter = {StoryId: Id};
        return this.Stories.findOne(filter, { 'Writer._id': 1 });
    }

    async GetStoryPerUser(UserId: string){
        return this.Stories.find({"Writer._id": UserId}, {project: { Thumbnail: 0 }});
    }
}