import { Injectable } from "@nestjs/common";

@Injectable()
export class Neo4JFollowersRepository{


    async CreateUserNode(UserId: string, newContent: any){
        console.log("Node is going to be created");
    }

    async UpdateUserNode(UserId: string, NewContent: any){
        console.log("Update user node");
    }

    async DeleteUserNode(UserId: string, newContent: any){
        console.log("Deletion of node is started");
    }

    async CreateStoryNode(StoryId: string, NewContent:any){
        console.log(`Story node created`);
    }

    async DeleteStoryNode(StoryId: string, newContent: any){
        console.log("Story node is created");
    }

    async UpdateStoryNode(StoryId: string, newContent: any){
        console.log("Story node is created");
    }

    async FollowUser(YourUserId: string, TargetUserId: string){
        console.log(`User with Id: ${YourUserId} follows User with Id: ${TargetUserId}`);
    }

    async UnFollowUser(YourUserId: string, TargetUserId: string){
        console.log(`User with Id: ${YourUserId} unfollows User with Id: ${TargetUserId}`);
    }

    async FollowStory(YourUserId: string, TargetStoryId: string){
        console.log(`User with Id: ${YourUserId} follows Story with Id: ${TargetStoryId}`);
    }

    async UnFollowStory(YourUserId: string, TargetStoryId: string){
        console.log(`User with Id: ${YourUserId} unfollows Story with Id: ${TargetStoryId}`);
    }
}