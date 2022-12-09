import { Test, TestingModule } from "@nestjs/testing";
import mongoose from "mongoose";
import { MockData } from "../../Data/DummyData/UserList";
import { Neo4JFollowersRepository } from "../../Data/Repositories/Neo4J.Repository";
import { StoryRepository } from "../../Data/Repositories/Story.Repository";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import { RecommendedStoryController } from './RCS.controller';

describe('Test neo4Jcontroller', ()=>{
    let app: TestingModule;
    let MockRepo: MockData;
    let NeoController: RecommendedStoryController;
    let NeoRepo: Neo4JFollowersRepository;
    let StoryRepo: StoryRepository;
    let UserRepo: UserRepository;

    beforeAll(async ()=>{
        MockRepo = new MockData();
        app = await Test.createTestingModule({
          controllers: [RecommendedStoryController],
          providers: [
            {
                provide: UserRepository,
                useValue:{
                    FollowUser: jest.fn(),
                    UnfollowUser: jest.fn(),
                    followStory: jest.fn(),
                    UnFollowStory: jest.fn(),
                }
            },
            {
                provide: StoryRepository,
                useValue:{
                    followStory: jest.fn(),
                    UnFollowStory: jest.fn(),
                    GetRecommended: jest.fn()
                }
            },
            {
                provide: Neo4JFollowersRepository,
                useValue:{
                    FollowUser: jest.fn(),
                    UnFollowUser: jest.fn(),
                    FollowStory: jest.fn(),
                    UnFollowStory: jest.fn(),
                    GetRecommendedStories: jest.fn()
                }
            }
        ],
        }).compile();
        //Assigns controllers
        UserRepo = app.get<UserRepository>(UserRepository);
        NeoRepo = app.get<Neo4JFollowersRepository>(Neo4JFollowersRepository);
        StoryRepo = app.get<StoryRepository>(StoryRepository);

        //Mocks controller;
        NeoController = new RecommendedStoryController(NeoRepo, StoryRepo, UserRepo);
    })

    describe('Test follow controller process', ()=>{
        let RequestBody: any;
        let Element: User;
        let method: any;
        let NeoMethod: any;


        beforeEach(()=>{
            RequestBody = {};
            RequestBody["User"] ={ Id: "UserId" };
            Element = MockRepo.List[0];
        })
        
        it('Follow story', async()=>{
            
            const TargetId = "1111";
            const NeoResult = ["Key", "Neo4jAttributen"]
            Element.StoryFollowedlist = [new mongoose.Types.ObjectId("63938eed3ca47c2ea067262c")];
            const MdbResult = Element;

            NeoMethod = jest.spyOn(NeoRepo, 'FollowStory').mockImplementation(async(story:string, target: string)=>{return NeoResult})
            method = jest.spyOn(UserRepo, 'followStory').mockImplementation(async(story: string, target:string)=>{return MdbResult});
           
            
            const result = await NeoController.FollowStory(TargetId, RequestBody);


            console.log();
            expect(result.status).toEqual(204);
        })

        it('UnFollow story', async()=>{
             
            const TargetId = "1111";
            const NeoResult = ["Key", "Neo4jAttributen"]
            Element.StoryFollowedlist = [];
            const MdbResult = Element;

            NeoMethod = jest.spyOn(NeoRepo, 'UnFollowStory').mockImplementation(async(story:string, target: string)=>{return NeoResult})
            method = jest.spyOn(UserRepo, 'UnFollowStory').mockImplementation(async(story: string, target:string)=>{return MdbResult});
           
            
            const result = await NeoController.FollowStory(TargetId, RequestBody);


            console.log();
            expect(result.status).toEqual(204);
            
        })
    })

    describe('Test follow controller process', ()=>{

        let RequestBody: any;
        let Element: User;
        let method: any;
        let NeoMethod: any;

        beforeEach(()=>{
            RequestBody = {};
            RequestBody["User"] ={ Id: "UserId" };
            Element = MockRepo.List[0];
        })
        
        it('Follow user', async()=>{
            const TargetId = "1111";
            const NeoResult = ["Key", "Neo4jAttributen"]
            Element.StoryFollowedlist = [];
            const MdbResult = Element;

            NeoMethod = jest.spyOn(NeoRepo, 'UnFollowStory').mockImplementation(async(story:string, target: string)=>{return NeoResult})
            method = jest.spyOn(UserRepo, 'UnFollowStory').mockImplementation(async(story: string, target:string)=>{return MdbResult});
           
            
            const result = await NeoController.FollowStory(TargetId, RequestBody);


            console.log();
            expect(result.status).toEqual(204);

        })

        it('UnFollow user', async()=>{
            const TargetId = "1111";
            const NeoResult = ["Key", "Neo4jAttributen"]
            Element.FollowUserlist = [];
            const MdbResult = Element;

            NeoMethod = jest.spyOn(NeoRepo, 'UnFollowUser').mockImplementation(async(story:string, target: string)=>{return NeoResult})
            method = jest.spyOn(UserRepo, 'UnfollowUser').mockImplementation(async(story: string, target:string)=>{return MdbResult});
           
            
            const result = await NeoController.FollowStory(TargetId, RequestBody);


            console.log();
            expect(result.status).toEqual(204);
            
        })
    })

    describe('Test follow controller process', ()=>{
        let RequestBody: any;
        let Element: User;
        let method: any;
        let NeoMethod: any;

        beforeEach(()=>{
            RequestBody = {};
            RequestBody["User"] ={ Id: "1111" };
            Element = MockRepo.List[1];
        })

        it('Get recommended storylist.', async()=>{
            const list = MockRepo.StoryList;
            NeoMethod = jest.spyOn(NeoRepo, 'GetRecommendedStories')
            .mockImplementation(async(userId: string)=>{return ["63933237c9d586d6c8fdf1d0", "639332434b82de057e039e7c"]});

            method = jest.spyOn(StoryRepo, 'GetRecommended')
            .mockImplementation(async(ids:string[])=>{return list});
            console.log();
            const result = await NeoController.GetRecommendations(RequestBody);

            expect(result.status).toEqual(201);
            expect(result.message).toEqual( "Recommended stories to follow");
            expect(result.result.RC_Stories).toEqual(list);
        })
    })
})