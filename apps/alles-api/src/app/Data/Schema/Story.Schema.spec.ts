import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { disconnect, Model } from "mongoose";
import { User, UserDocument, UserSchema } from "./UserSchema";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Story, StoryDocument, StorySchema } from "./Story.Schema";
import { Chapter, ChapterSchema, Page, PageSchema } from "./PageSchema";
import { version } from "uuid";

describe('Test user validation schema', ()=>{
    let mongod: MongoMemoryServer;
    let userModel: Model<UserDocument>;
    let StoryModel: Model<StoryDocument>;

    beforeAll(async ()=>{
        console.log("Start schema setup");
        let uri: string;
    
        const app = await Test.createTestingModule({
        imports: [
            MongooseModule.forRootAsync({
                useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return {uri};
                },
                
            }),
            MongooseModule.forFeature([
                {name: User.name, schema: UserSchema},
                {name: Story.name, schema: StorySchema},
                {name: Chapter.name, schema: ChapterSchema},
                {name: Page.name, schema: PageSchema}
            ])
        ],}).compile();

        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
        StoryModel = app.get<Model<StoryDocument>>(getModelToken(Story.name));

        await userModel.ensureIndexes();
    })

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
      });


    describe('Test schema validation', ()=>{
        afterEach(async()=>{
            await StoryModel.deleteMany({});
        })

        it('story creation', async()=>{
            const Original ={
                Title: "Een verhaal",
                StoryLine: "Mysterie verhaal",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                IsAdultOnly: false,
                Genres: "Mysterie",
                PublishDate: new Date(),
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 

            const model = new StoryModel(Original);

            
            await model.save();

            expect(model._id).toBeTruthy();
        })

        it('Test default fields', async()=>{
            const Original ={
                Title: "Een verhaal",
                StoryLine: "Mysterie verhaal",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                Genres: "Mysterie",
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 
            const model = new StoryModel(Original);
            
            await model.save();
            expect(model.PublishDate).toBeTruthy();
            expect(model.IsAdultOnly).toEqual(true);
        })

        it('Test required no writer fields', async()=>{
            const Original ={
                Title: "Een verhaal",
                StoryLine: "Mysterie verhaal",
                Genres: "Mysterie",
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 
            const model = new StoryModel(Original);
            
            await expect(model.save()).rejects.toThrow();
        })

        it('Test required no Title fields', async()=>{
            const Original ={
                StoryLine: "Mysterie verhaal",
                Genres: "Mysterie",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 
            const model = new StoryModel(Original);
            
            await expect(model.save()).rejects.toThrow();
        })

        it('Test required no Genre fields', async()=>{
            const Original ={
                Title: "Verhaal",
                StoryLine: "Mysterie verhaal",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 
            const model = new StoryModel(Original);
            
            await expect(model.save()).rejects.toThrow();
        })
    
        it('Test required no Storyline fields', async()=>{
            const Original ={
                Title: "Verhaal",
                Genre: "Myserie",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 
            const model = new StoryModel(Original);
            
            await expect(model.save()).rejects.toThrow();
        })

        it('Test required no thumbnail fields', async()=>{
            const Original ={
                Title: "Verhaal",
                StoryLine: "Mysterie verhaal",
                Genre: "Myserie",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
            } 
            const model = new StoryModel(Original);
            
            await expect(model.save()).rejects.toThrow();
        })

        it('Uuid checking', async()=>{
            const Original ={
                Title: "Een verhaal",
                StoryLine: "Mysterie verhaal",
                Writer: {
                    _id: undefined,
                    UserName: "Nieuwe gebruiker",
                    Email: "Nieuwe@example.com",
                    Role: "REGULAR",
                    DateOfBirth: new Date()
                },
                IsAdultOnly: false,
                Genres: "Mysterie",
                PublishDate: new Date(),
                Thumbnail: {
                    Base64Image: "asdsifiojafsjddfas",
                    ImageName: "Afbeelding.png"
                },
            } 

            const model = new StoryModel(Original);

            
            await model.save();

            expect(model.StoryId).toBeTruthy();
            expect(version(model.StoryId)).toBe(4);
        })
    })
})