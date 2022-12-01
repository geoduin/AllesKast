import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Controllers/Auth.Module';
import { DataModule } from './Controllers/Data.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.Database)
    , 
    AuthModule
    ,
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
