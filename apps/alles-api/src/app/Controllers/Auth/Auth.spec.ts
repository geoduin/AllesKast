import { Test, TestingModule } from "@nestjs/testing";
import mongoose from "mongoose";
import { AppService } from "../../app.service";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import { AuthController } from '../Auth/Auth.controller';
describe('AuthController', () => {
    let app: TestingModule;
    let authController: AuthController;
    let service: UserRepository;

    beforeAll(async () => {
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
      authController = app.get<AuthController>(AuthController);
      service = app.get<UserRepository>(UserRepository);
    });
  
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Services should be created', () => {
        expect(service).toBeTruthy();
        expect(authController).toBeTruthy();
      });

    describe('Register', () => {
      let exampleId, register, login, create;
      let exampleResult: User, exampleUser: User;
      beforeEach(()=>{
        exampleUser = {
          Id: "",
          "UserName": "JamesJames",
          "Email": "Xin10@example.com",
          "Password": "MichealWithman",
          "DateOfBirth": new Date(),
          "Role": "Student"
          }
          exampleResult = {
            UserName: "JamesJames",
            Password: "$2b$12$iRzc3lvT39iTrylSiNj.xuORFP4ggayCsF3GzDrfH0nHZDkPwQGXu",
            DateOfBirth: new Date(),
            Email: "Xin20@example.com",
            Role: "Student",
            Id: "a290f9ba-8e60-4898-91bd-f48ad961be31",
          }
          exampleId =  "6384b5325b176191ae45ef96"
          create = jest.spyOn(service, 'Create')
          .mockImplementation(async( dto: User) => { return exampleUser})
      })
      it('Register user"', async () => {
        const authController = app.get<AuthController>(AuthController);
        
        login = await jest.spyOn(service, 'Create')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (user: User )=> { return exampleUser})
        const result = await authController.CreateUser(exampleResult);
        expect(result).toEqual(exampleUser);
        
      });
    });
  });