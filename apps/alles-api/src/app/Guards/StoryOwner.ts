import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { IStory } from "data";
import mongoose from "mongoose";
import { Observable } from "rxjs";
import { StoryRepository } from "../Data/Repositories/Story.Repository";
import { UserRepository } from "../Data/Repositories/User.Repository";
import { Story } from "../Data/Schema/Story.Schema";

@Injectable()
export class StoryOwnerGuard implements CanActivate{

    constructor(private storyRepo: StoryRepository){

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('Story guard passed (1)');
        const host = context.switchToHttp();
        const request = host.getRequest();
        const para = host.getRequest();
        //Receives token from request body
        const User = request["User"];
        
        console.log('Story guard passed (2)');
        console.log(para.params);
        const _id: string = para.params.Id;

        //Retrieve story from database
        const story = await this.storyRepo.GetOneBasic(_id);
        
        console.log('Story guard passed (3)');
        console.log(story);
        console.log('Story guard passed (4)');
        if(story){
            console.log('Story guard passed (5)');
            const i = story as IStory;
            console.log(i);
            if(i.Writer?._id == User.Id){
                console.log('Story guard passed (6)');
                return true;
            }
            return false;
        }
        return true;
        
    }

}