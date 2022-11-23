import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { AuthController } from "./Auth/Auth.controller";
import { UserController } from "./Users/Userr.controller";

@Module({
    //Legt database connectie met de cloud database van mongodb.
    imports: [MongooseModule.forFeature()],
    controllers: [AppController, UserController, AuthController],
    providers: [AppService],
  })
export class DataModule {}