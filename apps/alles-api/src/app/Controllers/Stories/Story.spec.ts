import { Test, TestingModule } from "@nestjs/testing";
import { Document } from "mongoose";
import { MockData } from "../../Data/DummyData/UserList";
import { ChapterRepository } from "../../Data/Repositories/Chapter.Repository";
import { CommentRepository } from "../../Data/Repositories/Comment.Repository";
import { StoryRepository } from "../../Data/Repositories/Story.Repository";
import { Chapter, Page } from "../../Data/Schema/PageSchema";
import { Comments, Story } from "../../Data/Schema/Story.Schema";
import { StoryController } from './Story.controller';

describe('Story controller test', () => {
    let app: TestingModule;
    let MockStoryController: StoryController;
    let MockCommentRepo: CommentRepository;
    let MockStoryRepo: StoryRepository;
    let MockChapterRepo: ChapterRepository;
    let MockRepo: MockData;

  
    beforeAll(async () => {
      MockRepo = new MockData();


      app = await Test.createTestingModule({
        controllers: [StoryController],
        providers: [
          {
            provide: StoryRepository, useValue: {
            GetOne: jest.fn(),
            Create: jest.fn(),
            Update: jest.fn(),
            Delete: jest.fn()
          }},
        {
          provide: ChapterRepository,
          useValue: {
            AddChapterToStory: jest.fn(),
            DeleteChapter: jest.fn(),
            UpdateChapter: jest.fn(),
            GetAllChapters: jest.fn(),
            GetChapterPages: jest.fn(),
          }
        },
        {
          provide: CommentRepository,
          useValue:{
            PostComment: jest.fn(),
            UpdateComment: jest.fn(),
            GetOne: jest.fn(),
            DeleteComment: jest.fn(),
            AllComments: jest.fn()
          }
        }],
      }).compile();
      MockChapterRepo = app.get<ChapterRepository>(ChapterRepository);
      MockCommentRepo = app.get<CommentRepository>(CommentRepository);
      MockStoryRepo = app.get<StoryRepository>(StoryRepository);

      //Creates mock controller
      MockStoryController = new StoryController(MockStoryRepo, MockChapterRepo, MockCommentRepo);
    });
  
    describe('Setup all components', () => {
      it('All components load fine', () => {
        expect(MockStoryRepo).toBeTruthy();
        expect(MockCommentRepo).toBeTruthy();
        expect(MockChapterRepo).toBeTruthy();
        expect(MockStoryController).toBeTruthy();
      });
    });

    describe('CRUD Story', ()=>{
      let Delete, Update, get, All, Element: Story;

      beforeEach(()=>{
        Element = MockRepo.StoryList[0];
      })

      it('Get one', async()=>{
        const Aggregate: Story[] = [];
        Aggregate.push(Element);

        get = jest.spyOn(MockStoryRepo, 'GetOne')
        .mockImplementation(async(_id:string)=>{ return Aggregate})

        const result = await MockStoryController.OneStory("1110");

        expect(result).toEqual(Element);
      })

      it('Delete one', async()=>{
        get = jest.spyOn(MockStoryRepo, 'Delete')
        .mockImplementation(async(_id:string)=>{ return Element})

        const result = await MockStoryController.DeleteStory("1110");

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(Element);
      })
      it('Update one', async()=>{
        Element.Genres = "Actie"

        get = jest.spyOn(MockStoryRepo, 'Update')
        .mockImplementation(async(_id:string, _storyObj: Partial<Story>)=>{ return Element})

        const result = await MockStoryController.UpdateStory("1110", Element);

        expect(result).toEqual(Element);;
      })

      it('Create one', async()=>{
        Element.Genres = "Actie"

        get = jest.spyOn(MockStoryRepo, 'Create')
        .mockImplementation(async(_storyObj: Partial<Story>)=>{ return Element})

        const result = await MockStoryController.CreateStory(Element);

        expect(result.message).toEqual("Creation succeeded");
      })

    })

    describe('CRUD Comment', ()=>{
      let Delete, Update, gOne, All, Element:any;

      
      
      it('Get one', async()=>{
        Element =  MockRepo.StoryList[0];
        MockRepo.CommentsList[0];
        Element.Comments = MockRepo.CommentsList;
        gOne = jest.spyOn(MockCommentRepo, 'GetOne')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_stId:string, _cId: string ) => Element);

        const result = await MockStoryController.GetComment("1111", "999");

        expect(result.status).toEqual(201);
      })

      it('Delete one', async()=>{
        Element =  MockRepo.StoryList[0];
        Element.Comments = [];
        gOne = jest.spyOn(MockCommentRepo, 'DeleteComment')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_stId:string, _cId: string ) => Element);

        const result = await MockStoryController.DeleteComment("1111", "999");

        expect(result.status).toEqual(201);
        expect(result.result?.Comments).toEqual([]);
      })
      it('Update one', async()=>{
        Element =  MockRepo.StoryList[0];
        Element.Comments = MockRepo.CommentsList;
        const updatedComment ={
          "CommentId": "999",
          "Content": "Goed",
          "PublishDate": new Date(),
          "Title": "Nieuwe comment",
          "UserId": "1000-1000-1000-1000",
          "Username": "Mongod2"
      }
      Element.Comments[0] = updatedComment;
        gOne = jest.spyOn(MockCommentRepo, 'UpdateComment')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_stId:string, _cId: string ) => Element);

        const result = await MockStoryController.UpdateComment("1111", "999", updatedComment);

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(Element);
      })

      it('Create one', async()=>{
        Element =  MockRepo.StoryList[0];
        Element.Comments = MockRepo.CommentsList;
        const updatedComment ={
          "CommentId": "9991",
          "Content": "Goed",
          "PublishDate": new Date(),
          "Title": "Nieuwe comment",
          "UserId": "1000-1000-1000-1000",
          "Username": "Mongod2"
      }
      Element.Comments.push(updatedComment);
        gOne = jest.spyOn(MockCommentRepo, 'PostComment')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_stId:string, _cId: Comments ) => Element);

        const result = await MockStoryController.PostCommentOnStory("1111", updatedComment);

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(Element);
      })
    })

    describe('CRUD Chapter', ()=>{
      let Delete, Update, GetOne, All, Element:Chapter;

      beforeAll(()=>{
        Element = MockRepo.ChapterList[1];
      })
      it('Create one', async()=>{
        const Chapter = MockRepo.ChapterList[0];

        GetOne = jest.spyOn(MockChapterRepo, 'AddChapterToStory').mockImplementation(async(stId:string, chapter:Chapter)=> Chapter);

        const result = await MockStoryController.PostChapters(Chapter, [], "999");

        expect(result.status).toEqual(204);
        expect(result.result).toEqual(Chapter);
      })

      it('Delete one', async()=>{
        GetOne = jest.spyOn(MockChapterRepo, 'DeleteChapter').mockImplementation(async(stId:string, chapter:string)=> Element);
        const result = await MockStoryController.DeleteChapter("1111", "999");

        expect(result.status).toEqual(200);
        expect(result.result).toEqual(Element);
      })

      it('Update one', async()=>{
        const chapter = MockRepo.ChapterList[0] as Partial<Chapter>;

        chapter.ChapterTitle = "Nieuwe titel";

        GetOne = jest.spyOn(MockChapterRepo, 'UpdateChapter')
        .mockImplementation(async(storyId: string, chapterId: string, chap: Partial<Chapter>)=> chapter);
        const result = await MockStoryController.UpdateChapter("1111", "999", chapter , []);

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(chapter);
      })
    })
  });