import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRepo } from "shared/entities";
import { Story, StoryDocument } from "../Schema/Story.Schema";

@Injectable()
export class StoryRepository implements IRepo<Story>{

    constructor(@InjectModel(Story.name) private Stories: Model<StoryDocument>){
    }
    async GetOne(Id: string): Promise<Story | null| unknown> {
        try {
            return this.Stories.findOne({StoryId: Id});
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
            return this.Stories.findOneAndDelete({StoryId: Id});
        } catch (error) {
            return false;
        }
    }
    async GetAll(): Promise<Story[]| unknown> {
        return this.Stories.find().exec();
    }

}