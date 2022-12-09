import { Test, TestingModule } from "@nestjs/testing";
import { IdentityUser } from "data";
import { AppService } from "../../app.service";
import { MockData } from "../../Data/DummyData/UserList";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import { UserController } from '../Users/Userr.controller';
describe('UserController', () => {
    let app: TestingModule;
    let MockUserRepo: UserRepository;
    let MockController: UserController;
    let MockRepo: MockData;

    beforeAll(async () => {
      MockRepo = new MockData();
      app = await Test.createTestingModule({
        controllers: [UserController],
        providers: [{
          provide: UserRepository, useValue: {
            All: jest.fn(),
            Update: jest.fn(),
            OneUser: jest.fn(),
            Delete: jest.fn(),
          }
        }],
      }).compile();

      MockUserRepo = app.get<UserRepository>(UserRepository);
      MockController = new UserController(MockUserRepo);
    });
  
    describe('Setup test environment', () => {
      it('Test setup is ready"', () => {
        expect(MockController).toBeTruthy();
        expect(MockUserRepo).toBeTruthy();
      });
    });

    describe('Basic CUD operations', () => {
      let exampleId, getOne, update, all, remove;
      let ExampleUser:any;
      beforeEach(()=>{
        ExampleUser = MockRepo.List[1];
      })

      it('GetList', async()=>{
        all = jest.spyOn(MockUserRepo, 'All').mockImplementation(async ()=> MockRepo.List);

        const result = await MockController.AllUsers();

        expect(result).toEqual(MockRepo.List);
        expect(result.length).toEqual(2);
      })

      it('GetOne', async () => {
        
        getOne = jest.spyOn(MockUserRepo, 'OneUser')
        .mockImplementation(async(id: string)=> {return ExampleUser});

        const result = await MockController.OneUser("63933250db47daf8fecc9249");

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(ExampleUser);
      });

      it('GetProfile', async () => {
        const RequestBody:any = {};

        RequestBody["User"] = "63933250db47daf8fecc9249";
        getOne = jest.spyOn(MockUserRepo, 'OneUser')
        .mockImplementation(async(id: string)=> {return ExampleUser});

        const result = await MockController.GetProfile(RequestBody);

        expect(result.status).toEqual(201);
        expect(result.result).toEqual(ExampleUser);
      });

      it('Update one',async () => {
        ExampleUser.PasswordConfirmation = ""
        ExampleUser.EditPassword = false;
        ExampleUser.UserName = "Nieuwe naam"
        getOne = jest.spyOn(MockUserRepo, 'Update')
        .mockImplementation(async(id: string, changes: Partial<IdentityUser>)=> {return ExampleUser});

        const result = await MockController.UpdateUser("63933250db47daf8fecc9249", ExampleUser);

        expect(result.status).toEqual(201);
        expect(result.message).toEqual("Update voltooid");
        expect(result.result).toEqual(ExampleUser);
      });

      it('Delete one', async () => {
        const result= {
          countDeletion: 1,
          anknowledge: true
        }
        remove = jest.spyOn(MockUserRepo, 'Delete')
        .mockImplementation(async (id: string)=> result as unknown as any);
        
        const resp = await MockController.DeleteUser("63933250db47daf8fecc9249");
        expect(resp.status).toEqual(201);
        expect(resp.message).toEqual("Deletion succeeded");
        expect(resp.result).toEqual(true);
      });
    });
  });