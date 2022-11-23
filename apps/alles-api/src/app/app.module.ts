import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Controllers/Auth/Auth.controller';
import { UserController } from './Controllers/Users/Userr.controller';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://User33:Das4reich@beifang.mwlxo7r.mongodb.net/?retryWrites=true&w=majority`)],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
