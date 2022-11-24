import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { UserRepository } from "../Data/Repositories/User.Repository";
import { Story, StorySchema } from "../Data/Schema/Story.Schema";
import { User, UserSchema } from "../Data/Schema/UserSchema";
import { AuthController } from "./Auth/Auth.controller";
import { UserController } from "./Users/Userr.controller";

@Module({
    //Legt database connectie met de cloud database van mongodb.
    imports: [MongooseModule.forFeature([
      {
          name: User.name,  schema: UserSchema
      },
      {
        name:Story.name, schema: StorySchema
      }
    ])],
    controllers: [AppController, UserController, AuthController],
    providers: [AppService, UserRepository],
  })
export class DataModule {}