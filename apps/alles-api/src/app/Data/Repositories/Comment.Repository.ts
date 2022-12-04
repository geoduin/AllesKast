import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Model } from "mongoose";
import { Comments, Story } from "../Schema/Story.Schema";

@Injectable()
export class CommentRepository{
    constructor(@InjectModel(Story.name) private Stories: Model<Story>){}
    
    async PostComment(storyId: string, comment: Comments){

        //Filters en commandos
        const filter = {StoryId: storyId}
        const PushCommand = { $push: {Comments : comment}}
        const n = {new: true};

        //Wijst een CommentId toe handmatig
        comment.CommentId = randomUUID(undefined);
        console.log("Een comment wordt nu gestart.");
        const r = await this.Stories.findOneAndUpdate(filter, PushCommand, n);
        return r;
    }


    async UpdateComment(storyId: string, commentId: string, comment: Comments){

        //Filters en commandos
        const filter = {StoryId: storyId, "Comments.CommentId": comment.CommentId}
        const PushCommand = { $set: {"Comments.$" : comment}}
        const n = {new: true};

        //Wijst een CommentId toe handmatig
        console.log("Een comment wordt nu gewijzigd.");
        return await this.Stories.findOneAndUpdate(filter, PushCommand, n);
    }

    async GetOne(storyId: string, commentId: string){

        //Filters en commandos
        const filter = {StoryId: storyId, "Comments.CommentId": commentId}
        const elem = {"Comments": {$elemMatch: {CommentId: commentId}}}
        //const PushCommand = { $set: {"Comments.$" : comment}}
        const projection = {"Comments.$": 1};
        const n = {new: true};

        //Wijst een CommentId toe handmatig
        console.log("Een comment wordt nu gewijzigd.");
        return await this.Stories.findOne(filter, elem);
    }

    async DeleteComment(storyId: string, commentId: string){

        const filter = {StoryId: storyId, "Comments.CommentId": commentId};
        const projection = {"Comments.$": 1};
        const deleteCommand = { $pull: {Comments : { CommentId : commentId}}}
        console.log("Deletion of user");
        return await this.Stories.findOneAndUpdate(filter, deleteCommand, projection);

    }

    async AllComments(storyId: string){

        const filter = {StoryId: storyId};
        const projection = {"Comments": 1};
        console.log("Deletion of user");
        return await this.Stories.findOne(filter, projection);

    }
}