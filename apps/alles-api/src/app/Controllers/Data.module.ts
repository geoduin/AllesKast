import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chapter } from "data";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { StoryRepository } from "../Data/Repositories/Story.Repository";
import { UserRepository } from "../Data/Repositories/User.Repository";
import { ChapterSchema } from "../Data/Schema/PageSchema";
import { Story, StorySchema } from "../Data/Schema/Story.Schema";
import { User, UserSchema } from "../Data/Schema/UserSchema";
import { AuthController } from "./Auth/Auth.controller";
import { StoryController } from "./Stories/Story.controller";
import { UserController } from "./Users/Userr.controller";

@Module({
    //Legt database connectie met de cloud database van mongodb.
    imports: [MongooseModule.forFeature([
      {
          name: User.name,  schema: UserSchema
      },
      {
        name:Story.name, schema: StorySchema
      },
      {
        name: Chapter.name, schema: ChapterSchema
      }
    ])],
    controllers: [AppController, UserController, AuthController, StoryController],
    providers: [AppService, UserRepository, StoryRepository],
  })
export class DataModule {}