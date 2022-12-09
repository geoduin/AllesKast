import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { disconnect, Model } from "mongoose";
import { User, UserDocument, UserSchema } from "./UserSchema";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { clear } from "console";
import { validate } from "uuid";
import { version } from "os";

describe('Test user validation schema', ()=>{
    let mongod: MongoMemoryServer;
    let userModel: Model<UserDocument>;

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
            MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
        ],}).compile();

        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
        await userModel.ensureIndexes();
    })

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
      });


    describe('Test schema validation', ()=>{
        afterEach(async()=>{
            await userModel.deleteMany({});
        })
        it('Test duplicate UserName',async ()=>{
            const Original = {
                UserName: "Original",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 

            const Duplicate ={
                UserName: "Original",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 

            const models = new userModel(Original);
            const OtherModels = new userModel(Duplicate);

            await models.save();
            await expect(OtherModels.save()).rejects.toThrow()
        })

        it('Test duplicate Email',async ()=>{
            const Original = {
                UserName: "Original1",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 

            const Duplicate ={
                UserName: "NotOriginal",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 

            const models = new userModel(Original);
            const OtherModels = new userModel(Duplicate);

            await models.save();
            await expect(OtherModels.save()).rejects.toThrow()
        })

        it('Test default role value',async ()=>{
            const user = new userModel();

            expect(user.Role).toEqual("REGULAR");
        })

        it('Test mandatory password field',async ()=>{
            const Original = {
                UserName: "Original1",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 
            const user = new userModel(Original);
            

            expect(user.save()).rejects.toThrow()
        })

        it('Test default lists',async ()=>{
            const Original = {
                UserName: "Original1",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 
            const user = new userModel(Original);

            await user.save()
            expect(user.FollowUserlist).toEqual([]);
            expect(user.StoryFollowedlist).toEqual([]);
        })

        it('Test uuid Id',async ()=>{
            const Original = {
                UserName: "Original1",
                Password: "OriginalOriginal",
                DateOfBirth: new Date(),
                Email: "Original@example.com",
                Role: "REGULAR",
            } 
            const user = new userModel(Original);

            await user.save()
            expect(validate(user.Id)).toBeTruthy();
        })
    })
})