import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRepo } from "shared/entities";
import { Story, StoryDocument } from "../Schema/Story.Schema";

@Injectable()
export class StoryRepository implements IRepo<Story>{

    constructor(@InjectModel(Story.name) private Stories: Model<StoryDocument>){
    }
    async GetOne(Id: string): Promise<Story | null> {
        throw new Error("Method not implemented.");
    }
    async Create(object: Story): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
    async Update(Id: string, UpdatedElement: Story): Promise<Story | null> {
        throw new Error("Method not implemented.");
    }
    async Delete(Id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async GetAll(): Promise<Story[]> {
        throw new Error("Method not implemented.");
    }

}