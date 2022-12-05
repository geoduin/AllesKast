import { Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { ResponseMessage } from "data";
import { Neo4JFollowersRepository } from "../../Data/Repositories/Neo4J.Repository";

@Controller("RCS")
export class RecommendedStoryController{


    constructor(private neo4jRepo: Neo4JFollowersRepository){}
    
    @Get("Stories")
    async GetRecommendations(): Promise<ResponseMessage>{
        console.log("Get recommendations");
        //Start transactie

        //Haal userId van token of mongodb database.

        //Haal neo4j resultaat op uit aurora database

        //Op basis van de neo4j resultaat een query uitvoeren op de mongodb database.

        //Geef lijst verhalen terug aan de gebruiker.
        
        return {status: 201, message: "Recommended stories to follow", result: []}
    }

    @Put("User/:Id")
    async FollowUser(@Param("Id") UserId: string): Promise<ResponseMessage>{

        //Push gebruikerId in de volgersarray in mongodb

        //Koppel een relatie tussen gebruiker

        return {status: 204, message: "Follow user succeeded", result: ""};
    }

    @Put("Story/:Id")
    async FollowStory(@Param("Id") StoryId: string): Promise<ResponseMessage>{

        //Push verhaalId in mongodb

        //Koppel een relatie tussen gebruiker en verhaal

        return {status: 204, message: "Follow user succeeded", result: ""};
    }

    @Delete("User/:Id")
    async UnFollowUser(@Param("Id") UserId: string): Promise<ResponseMessage>{
      //Verwijder verhaalId in mongodb

        //onKoppel een relatie tussen gebruiker en verhaal
        return {status: 204, message: "Unfollow user succeeded", result: ""};
    }

    @Delete("Story/:Id")
    async UnFollowStory(@Param("Id") StoryId: string): Promise<ResponseMessage>{
      //Push verhaalId in mongodb

        //On Koppel een relatie tussen gebruiker en verhaal
        return {status: 204, message: "Follow user succeeded", result: ""};
    }
}