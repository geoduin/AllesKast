import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Controllers/Auth.Module';
import { DataModule } from './Controllers/Data.module';
import { Neo4jModule } from './Data/Neo4J/neo4.module';

const Host=`${process.env['NEO4J_HOST']}`; 
const UsrNme= `${process.env['NEO4J_USR']}`
const psswrd = `${process.env['NEO4J_PWD']}`
@Module({
  imports: [
    MongooseModule.forRoot(environment.Database)
    , 
    AuthModule
    ,
    DataModule
    ,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: Host ,
      username: UsrNme,
      password: psswrd,
      database: ''
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
