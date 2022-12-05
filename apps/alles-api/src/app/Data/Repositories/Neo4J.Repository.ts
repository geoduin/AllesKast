import { Injectable } from "@nestjs/common";
import * as neo4j from 'neo4j-driver';
import { auth, Driver } from "neo4j-driver-core";
import { Neo4jService } from "../Neo4J/neo4j.service";

@Injectable()
export class Neo4JFollowersRepository{


    constructor(private service: Neo4jService){

    }

    async CreateUserNode(UserId: string, NewContent: any){
        const params = {IdParams: UserId, nameParams: NewContent.UserName, dateOfBirthParams: NewContent.DateOfBirth};
        const result = await this.service.singleWrite('CREATE (u:User {UserId: $IdParams, UserName: $nameParams})', params);
        /*const query = `
        MERGE (u:User {UserId: $IdParams, UserName: $nameParams})
        MERGE (s:Story {StoryId: $IdStoryParams, Title: $TitleParams } )
        MERGE (u)-[:FOLLOWED ]->(s) RETURN u, s
        `*/
        console.log("Node is going to be created");
        return result;
    }

    async UpdateUserNode(UserId: string, NewContent: any){
        //Parameters setup
        const params = {IdParams: UserId, nameParams: NewContent.UserName, dateOfBirthParams: NewContent.DateOfBirth};

        //Update query.
        const query = 'MATCH (u:User{UserId: $IdParams}) SET u.UserName = $nameParams RETURN u'

        //Performing read operation
        const result = await this.service.singleWrite(query,params)

        console.log("Update user node");

        //Returns new user node.
        return result;
    }

    async DeleteUserNode(UserId: string, newContent: any){

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

    async CreateStoryNode(StoryId: string, NewContent:any){
        const params = {
            IdParams: StoryId, 
            nameParams: NewContent.Title, 
            GenreParams: NewContent.Genre, 
            WriterIdParams: NewContent.TargetUserId, 
            WriterNameParams: NewContent.UserName
        };
        
        const query = ` MERGE (s:Story {StoryId: $IdParams, Title: $nameParams, Genre: $GenreParams } )
                        MERGE (u:User {UserId: $WriterIdParams, UserName: $WriterNameParams})
                        MERGE (u)-[:WRITTEN ]->(s) 
                        RETURN u, s`
        
        const result = await this.service.singleWrite(query, params);

        console.log("Story node is going to be created");
        return result;
    }

    async DeleteStoryNode(StoryId: string, newContent: any){
        //Parameters setup
        const params = {IdParams: StoryId};

        //Delete query.
        const query = 'MATCH (s:Story {StoryId: $IdParams} ) DETACH DELETE s'

        const res = await this.service.singleWrite(query, params);
        console.log("Story node is created");
        return res;
    }

    async UpdateStoryNode(StoryId: string, NewContent: any){
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

    async FollowUser(YourUserId: string, TargetUserId: string){
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetUserId
        }
        
        /* RESERVE QUERY IN HET GEVAL DAT ER WEINIG TIJD OVER IS.
        
        const reserveQuery = ` 
        
        MERGE (u:User {UserId: $YourParams} )
        MERGE (t:User {UserId: $TargetParams})
        MERGE (u)-[:FOLLOWS_USER ]->(t) 
        RETURN u, s`*/
        
        const Query = `
        MATCH(u: User {UserId: $YourParams})
        MATCH(t: User {UserId: $TargetParams}) 
        CREATE (u)-[f:FOLLOWS_USER]->(t)
        RETURN u, t, f `

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} follows User with Id: ${TargetUserId}`);
        
        return result;
    }

    async UnFollowUser(YourUserId: string, TargetUserId: string){
        
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetUserId
        }
        
        /* RESERVE QUERY IN HET GEVAL DAT ER WEINIG TIJD OVER IS.
        
        const reserveQuery = ` 
        
        MERGE (u:User {UserId: $YourParams} )
        MERGE (t:User {UserId: $TargetParams})
        MERGE (u)-[:FOLLOWS_USER ]->(t) 
        RETURN u, s`*/
        
        const Query = `
        MATCH(u: User {UserId: $YourParams})-[r:FOLLOWS_USER]->(t: User {UserId: $TargetParams}) 
        DELETE r`

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} unfollows User with Id: ${TargetUserId}`);
        
        return result;
    }

    async FollowStory(YourUserId: string, TargetStoryId: string){
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetStoryId
        }
        
        /* RESERVE QUERY IN HET GEVAL DAT ER WEINIG TIJD OVER IS.
        
        const reserveQuery = ` 
        
        MERGE (u:User {UserId: $YourParams} )
        MERGE (t:Story {StoryId: $TargetParams})
        MERGE (u)-[:SUBSCRIBES_TO ]->(t) 
        RETURN u, s`*/
        
        const Query = `
        MATCH(u: User {UserId: $YourParams})
        MATCH(t: Story {StoryId: $TargetParams})
        MERGE (u)-[f:SUBSCRIBES_TO]->(t)
        RETURN u, t, f `

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} follows Story with Id: ${TargetStoryId}`);
        
        return result;
    }

    async UnFollowStory(YourUserId: string, TargetStoryId: string){
        const params = { 
            YourParams: YourUserId,
            TargetParams: TargetStoryId
        }
        const Query = `
        MATCH(u: User {UserId: $YourParams})-[r:SUBSCRIBES_TO]->(t: Story {StoryId: $TargetParams}) 
        DELETE r`

        const result = await this.service.singleWrite(Query, params);
        console.log(`User with Id: ${YourUserId} unfollows Story with Id: ${TargetStoryId}`);
        return result;
    }
}