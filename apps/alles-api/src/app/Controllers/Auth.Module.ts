import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";

@Module({
    imports: [MongooseModule.forRoot(`mongodb+srv://User33:Das4reich@beifang.mwlxo7r.mongodb.net/?retryWrites=true&w=majority`)],
    controllers: [AppController],
    providers: [AppService],
  })
export class AuthModule {}
