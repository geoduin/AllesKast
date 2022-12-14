import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as neo4j from 'neo4j-driver';
import { auth, Driver } from "neo4j-driver-core";
import { neoStoryDto, neoStoryDtoPartial } from "../dto/neo4Story";
import { UserDto } from "../dto/neo4User";
import { Neo4jService } from "../Neo4J/neo4j.service";
import { Story } from "../Schema/Story.Schema";
import { StoryRepository } from "./Story.Repository";
import { UserRepository } from "./User.Repository";

@Injectable()
export class Neo4JFollowersRepository{


    constructor(private service: Neo4jService, private UserRepo: UserRepository, private StoryRepo: StoryRepository){

    }

    //User nodes
    async CreateUserNode(UserId: string, NewContent: UserDto){
        const params = {IdParams: UserId, nameParams: NewContent.UserName, UserBirth: NewContent.DateOfBirth};
        const query = 'CREATE (u:User {UserId: $IdParams, UserName: $nameParams, DateOfBirth = date($UserBirth)}) RETURN u';
        const result = await this.service.singleWrite(query, params);
        /*const query = `
        MERGE (u:User {UserId: $IdParams, UserName: $nameParams})
        MERGE (s:Story {StoryId: $IdStoryParams, Title: $TitleParams } )
        MERGE (u)-[:FOLLOWED ]->(s) RETURN u, s
        `*/
        console.log("Node is going to be created");
        return result;
    }

    async UpdateUserNode(UserId: string, NewContent: UserDto){
        //Parameters setup
        const params = {IdParams: UserId, nameParams: NewContent.UserName, UserBirth: NewContent.DateOfBirth};

        //Update query.
        const query = 'MATCH (u:User{UserId: $IdParams}) SET u.UserName = $nameParams, u.DateOfBirth = date($UserBirth) RETURN u'

        //Performing read operation
        const result = await this.service.singleWrite(query,params)

        console.log("Update user node");

        //Returns new user node.
        return result;
    }

    async DeleteUserNode(UserId: string){

        //Parameters setup
        const params = {IdParams: UserId};

        //Update query.
        const query = 'MATCH (u:User{UserId: $IdParams}) DETACH DELETE u'

        //Performing read operation
        const r = await this.service.singleWrite(query,params)
        console.log("Deletion of node is started");
       
        //Returns new user node.
        return r;
        
    }

    //Story node CRUD
    async CreateStoryNode(StoryId: string, NewContent:neoStoryDto){
        const params = {
            IdParams: StoryId, 
            nameParams: NewContent.Title, 
            GenreParams: NewContent.Genre, 
            WriterIdParams: NewContent.Writer._id, 
            WriterNameParams: NewContent.Writer.UserName,
            WriterBirth: NewContent.Writer.DateOfBirth
        };
        
        const query = ` MERGE (s:Story {
            StoryId: $IdParams, 
            Title: $nameParams, 
            Genre: $GenreParams } )
                        MERGE (u:User {
                            UserId: $WriterIdParams, 
                            UserName: $WriterNameParams,
                            DateOfBirth: date($WriterBirth)
                        })
                        MERGE (u)-[:WRITTEN ]->(s) 
                        RETURN u, s`
        
        const result = await this.service.singleWrite(query, params);

        console.log("Story node is going to be created");
        return result;
    }

    async DeleteStoryNode(StoryId: string){
        //Parameters setup
        const params = {IdParams: StoryId};

        //Delete query.
        const query = 'MATCH (s:Story {StoryId: $IdParams} ) DETACH DELETE s'

        const res = await this.service.singleWrite(query, params);
        console.log("Story node is created");
        return res;
    }

    async UpdateStoryNode(StoryId: string, NewContent: neoStoryDtoPartial){
        //Parameters setup
        const params = {
            IdParams: StoryId, 
            nameParams: NewContent.Title, 
            GenreParams: NewContent.Genre, 
        };

        //Update query.
        const query = `
        MATCH (s:Story
            {
                StoryId: $IdParams
            }) 
        SET s.Title = $nameParams,
        s.Genre = $GenreParams 
        RETURN s
        `

        //Performing read operation
        const result = await this.service.singleWrite(query,params)

        console.log("Update user node");

        //Returns new user node.
        return result;
    }


    //Follow functionality
    async FollowUser(YourUserId: string, TargetUserId: string):Promise<any>{
        try {
            const params = { 
                YourParams: YourUserId,
                TargetParams: TargetUserId
            }
            
            //Insert query into neo4j database
            const Query = `
            MERGE(u: User {UserId: $YourParams})
            MERGE(t: User {UserId: $TargetParams}) 
            MERGE (u)-[f:FOLLOWS_USER]->(t)
            RETURN u, t, f `
    
            //Database action
            const result = await this.service.singleWrite(Query, params);
            const e = result.records[0];
            console.log(e);
            const resultString = `Eigen: ${result.records[0].get("u")}, gevolgde: ${result.records[0].get("t")}, relatie ${result.records[0].get("f")}`
            console.log(resultString);

            
            console.log(`User with Id: ${YourUserId} follows User with Id: ${TargetUserId}`);
            
            return result.records;
        } catch (error:any) {
            throw new BadRequestException(error.message);
        }
        
    }

    async UnFollowUser(YourUserId: string, TargetUserId: string):Promise<any>{
        
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetUserId
        }
        
        const Query = `
        MATCH(u: User {UserId: $YourParams})-[r:FOLLOWS_USER]->(t: User {UserId: $TargetParams}) 
        DELETE r`

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} unfollows User with Id: ${TargetUserId}`);
        
        return result.records;
    }

    async FollowStory(YourUserId: string, TargetStoryId: string):Promise<any>{
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetStoryId
        }

        const Query = `
        MERGE(u: User {UserId: $YourParams})
        MERGE(t: Story {StoryId: $TargetParams})
        MERGE (u)-[f:SUBSCRIBES_TO]->(t)
        RETURN u, t, f `

        try {
            const result = await this.service.singleWrite(Query, params);
            console.log(`User with Id: ${YourUserId} follows Story with Id: ${TargetStoryId}`);

            return result.records;
        } catch (error: any) {
          throw new NotFoundException(error.message);
        }
        
    }

    async UnFollowStory(YourUserId: string, TargetStoryId: string):Promise<any>{
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetStoryId
        }
        const Query = `
        MATCH(u: User {UserId: $YourParams})-[r:SUBSCRIBES_TO]->(t: Story {StoryId: $TargetParams}) 
        DELETE r`

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} unfollows Story with Id: ${TargetStoryId}`);

        
        return result.records;
    }

    //Recommendation

    async GetRecommendedStories(_UserId: string){
        const Query = 
        `
        MATCH(u:User{UserId: $UserIdParams})-[:FOLLOWS_USER]->(o:User)
        MATCH (o)-[:SUBSCRIBES_TO]->(s:Story)
        WHERE NOT (u)-[:SUBSCRIBES_TO]->(s)
        RETURN s
        `
        const params = {UserIdParams: _UserId};

        const result = await this.service.singleRead(Query, params);
        const idList: string[] = [];
        result.records.forEach((v)=>{
            //Adds results to an array.
            idList.push(v.get("s").properties.StoryId);
        })

        
        return idList;
    }
}