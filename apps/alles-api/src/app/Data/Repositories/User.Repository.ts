import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IdentityUser} from "data";
import { isValidObjectId, Model} from "mongoose";
import { User, UserDocument } from "../Schema/UserSchema";

@Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>){
        
    }

    async GetLoginUser(UserName: string):Promise<User | null>{
        return this.UserModel.findOne({UserName: UserName});
    }

    async Create(dto: User):Promise<User| null>{
        const CreationResult = await this.UserModel.create(dto);
        console.log(CreationResult);
        return CreationResult;
    }

    async All(): Promise<User[]>{
        console.log("Dit lukt 2");
        const results = await this.UserModel.find({}, {}).exec();
        console.log(results);
        console.log("Dit lukt 3");
        return results;
    }

    async Update(Id: string, changes: Partial<IdentityUser>){
        console.log(changes);
        try {
            const results = await this.UserModel.findByIdAndUpdate({_id: Id}, changes, {new: true, overwrite: true});
            return results;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    async OneUser(Id: string):Promise<User | null>{
        return this.UserModel.findById({_id: Id});
    }

    async Delete(Id: string){
        try {
            return this.UserModel.deleteOne({_id: Id}, {new: true});
        } catch (error) {
            throw new Error(`Deletion has failed`);

        }
    }

}