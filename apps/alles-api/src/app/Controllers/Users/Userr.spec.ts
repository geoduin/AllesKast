import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "../../app.service";
import { UserController } from '../Users/Userr.controller';
describe('UserController', () => {
    let app: TestingModule;
  
    beforeAll(async () => {
      app = await Test.createTestingModule({
        controllers: [UserController],
        providers: [AppService],
      }).compile();
    });
  
    /*describe('getData', () => {
      it('should return "Welcome to Alles-Api!"', () => {
        const appController = app.get<UserController>(UserController);
        expect(appController.getData()).toEqual({
          message: 'Welcome to Alles-Api!',
        });
      });
    });*/
  });