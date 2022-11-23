import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Controllers/Auth.Module';
import { AuthController } from './Controllers/Auth/Auth.controller';
import { DataModule } from './Controllers/Data.module';
import { UserController } from './Controllers/Users/Userr.controller';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://User33:Das4reich@beifang.mwlxo7r.mongodb.net/?retryWrites=true&w=majority`)
    , 
    AuthModule
    ,
    DataModule
    ,
    RouterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
