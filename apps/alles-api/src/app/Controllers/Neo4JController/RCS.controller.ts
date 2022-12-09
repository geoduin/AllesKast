import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { ResponseMessage } from "data";
import { Neo4JFollowersRepository } from "../../Data/Repositories/Neo4J.Repository";
import { StoryRepository } from "../../Data/Repositories/Story.Repository";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { AuthGuard } from "../../Guards/AuthGuard";

@Controller("RCS")
@UseGuards(AuthGuard)
export class RecommendedStoryController{

    constructor(
        private neo4jRepo: Neo4JFollowersRepository, 
        private storyRepo: StoryRepository, 
        private userRepo: UserRepository){}

        
    @Get("Stories/Recommendations")
    async GetRecommendations(@Req() request: any): Promise<ResponseMessage>{
        console.log("Get recommendations");
        //Start transactie
        const User = request["User"];

        const UserId = User.Id;
        //Haal userId van token of mongodb database.

        //Haal neo4j resultaat op uit aurora database
        const neo4jResult = await this.neo4jRepo.GetRecommendedStories(UserId);
        //Op basis van de neo4j resultaat een query uitvoeren op de mongodb database.
        const RC_Stories = await this.storyRepo.GetRecommended(neo4jResult);
        //Geef lijst verhalen terug aan de gebruiker.
        
        return {status: 201, message: "Recommended stories to follow", result: {RC_Stories, neo4jResult}}
    }

    @Put("Users/:Id/Follows")
    async FollowUser(@Param("Id") TargetUserId: string, @Req() request: any): Promise<ResponseMessage>{
        const OwnId = request["User"];
        console.log(OwnId);
        //Push gebruikerId in de volgersarray in mongodb
        const queryResult = await this.neo4jRepo.FollowUser(OwnId.Id, TargetUserId);
        //Koppel een relatie tussen gebruiker
        //MongoDb push query.
        const mongoResult = await this.userRepo.FollowUser(OwnId.Id, TargetUserId);
        console.log(mongoResult);

        return {status: 204, message: "Follow user succeeded", result: queryResult};
    }

    @Put("Stories/:Id/Follows")
    async FollowStory(@Param("Id") StoryId: string, @Req() request: any): Promise<ResponseMessage>{

        const OwnId = request["User"];
        console.log(OwnId);
        //Push verhaalId in mongodb
        const result = await this.neo4jRepo.FollowStory(OwnId.Id, StoryId);
        //Koppel een relatie tussen gebruiker en verhaal
        const mongoResult = await this.userRepo.followStory(OwnId.Id, StoryId);

        console.log(mongoResult);
        return {status: 204, message: "Follow user succeeded", result: {neo: result, mongo: mongoResult}};
    }

    @Delete("Users/:Id/Follows")
    async UnFollowUser(@Param("Id") TargetUserId: string, @Req() request: any): Promise<ResponseMessage>{
        const OwnId = request["User"];
        console.log(`Eigen gebruiker: ${OwnId.Id}`);
        //onKoppel een relatie tussen gebruiker en verhaal
        const rslt = await this.neo4jRepo.UnFollowUser(OwnId.Id, TargetUserId);

        //Ook in de mongodb database.
        const mongoResult = await this.userRepo.UnfollowUser(OwnId.Id, TargetUserId);
            
        return {status: 204, message: "Unfollow user succeeded", result: {neo: rslt, mongo: mongoResult} };
    }

    @Delete("Stories/:Id/Follows")
    async UnFollowStory(@Param("Id") StoryId: string, @Req() request: any): Promise<ResponseMessage>{
        //Push verhaalId in mongodb
        const OwnId = request["User"];
        console.log(OwnId);
        //On Koppel een relatie tussen gebruiker en verhaal
        const result = await this.neo4jRepo.UnFollowStory(OwnId.Id, StoryId);

        //Onkoppel in mongodb database
        const mongoResult = await this.userRepo.UnFollowStory(OwnId.Id, StoryId);
            console.log(mongoResult);
        return {status: 204, message: "Unfollow story succeeded.", result: {mongo: mongoResult, neo: result}};
    }
}