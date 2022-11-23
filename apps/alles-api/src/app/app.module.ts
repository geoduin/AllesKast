import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Controllers/Auth.Module';
import { DataModule } from './Controllers/Data.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://User33:Das4reich@beifang.mwlxo7r.mongodb.net/?retryWrites=true&w=majority`)
    , 
    AuthModule
    ,
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
