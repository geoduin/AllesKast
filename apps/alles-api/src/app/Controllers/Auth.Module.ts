import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { environment } from "../../environments/environment";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";

@Module({
    imports: [MongooseModule.forRoot(environment.Database)],
    controllers: [AppController],
    providers: [AppService],
  })
export class AuthModule {}
