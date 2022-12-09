import { Test, TestingModule } from "@nestjs/testing";
import mongoose from "mongoose";
import { AppService } from "../../app.service";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import { AuthController } from '../Auth/Auth.controller';
import {MockData} from '../../Data/DummyData/UserList';
import { Neo4jService } from "../../Data/Neo4J/neo4j.service";
import { IdentityUser } from "data";


describe('AuthController', () => {
    let app: TestingModule;
    let authController: AuthController;
    let userRepo: UserRepository;
    let MockRepo: MockData;
    
    beforeAll(async () => {
      MockRepo = new MockData();
      app = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [{
          provide: UserRepository,
          useValue:{
            GetLoginUser: jest.fn(),
            Create: jest.fn()
          }
        }],
      }).compile();
      //Assigns controllers
      userRepo = app.get<UserRepository>(UserRepository);
      authController = new AuthController(userRepo);
    });
  
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Services should be created', () => {
        expect(userRepo).toBeTruthy();
        expect(authController).toBeTruthy();
      });

    describe('Register', () => {
      let exampleId, register, login, create;
      let exampleResult: User, exampleUser: User;
      beforeEach(()=>{
        exampleUser = {
          "Id": "",
          "_id": undefined,
          "UserName": "Mongod",
          "Email": "Mongod@Example",
          "Password": "hiervoorgemaakte wachtwoord",
          "DateOfBirth": new Date(),
          "Role": "REGULAR",
          "StoryFollowedlist": [],
          "FollowUserlist": []
          }
          //Pakt resultaat uit mock lijst
          exampleResult = MockRepo.List[0];
          //Mocked create methode en return waarde
          create = jest.spyOn(userRepo, 'Create')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation(async( dto: User) => { return exampleResult})
      })
      it('Register user correctly"', async () => {
        //const authController = app.get<AuthController>(AuthController)

        const result = await authController.CreateUser(exampleResult); 

        expect(result.message).toEqual("Creation succeeded");
        expect(result.result).toEqual(exampleResult);
      });

      it('Give warning when service gives warning"', async () => {
        //const authController = app.get<AuthController>(AuthController)
    	  //Mocked create methode en return waarde
        create = jest.spyOn(userRepo, 'Create')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async( dto: User) => { return null})

        const result = await authController.CreateUser(exampleUser); 

        
        expect(result.message).toEqual("User creation failed");
        expect(create).toHaveBeenCalledTimes(1);
      });
    });

    describe('Login', () => {
      let exampleId, register, login, create;
      let exampleResult: User, exampleUser: any;
      beforeEach(()=>{
        exampleUser = {
          "UserName": "Mongod",
          "Password": "hiervoorgemaakte wachtwoord",
          }
          //Pakt resultaat uit mock lijst
          exampleResult = MockRepo.List[0];
          const Response = {User: exampleResult, Token: "TokenVoorbeeld"};
          //Mocked create methode en return waarde
          login = jest.spyOn(userRepo, 'GetLoginUser')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation(async(dto: string, password: string) => { return Response})
      })
      it('Login user correctly"', async () => {
        //const authController = app.get<AuthController>(AuthController)
        
        const result = await authController.Login(exampleUser); 

        expect(result.status).toEqual(200);
        expect(result.result).toEqual(exampleResult);
        expect(result.Token).toEqual("TokenVoorbeeld")
      });

      it('Give warning when service gives warning"', async () => {
        //const authController = app.get<AuthController>(AuthController)
    	  //Mocked create methode en return waarde
        login = jest.spyOn(userRepo, 'GetLoginUser')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async( dto: string, password: string) => { return null })

        const result = await authController.Login(exampleUser); 

        
        expect(result.message).toEqual(undefined);
        expect(result).toEqual({"Error": "Ongeldige waarden ingevoerd", "Message": "Retrieval failure", "status": 400});
      });
    });
  });