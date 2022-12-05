import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IdentityUser} from "data";
import { ClientSession, isValidObjectId, Model, startSession} from "mongoose";
import { ManagedTransaction, Transaction } from "neo4j-driver";
import { Neo4jService } from "../Neo4J/neo4j.service";
import { User, UserDocument } from "../Schema/UserSchema";

@Injectable()
export class UserRepository{

    

    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>, private Neo4j: Neo4jService){
        
    }

    async GetLoginUser(UserName: string):Promise<User | null>{
        return this.UserModel.findOne({UserName: UserName});
    }

    async Create(dto: User):Promise<User| null>{
        //Start
        const session = await this.UserModel.db.startSession();
        session.startTransaction();
        try {
            const CreationResult = await this.UserModel.create(dto);
            console.log(CreationResult);
            console.log("Inserted");

            //Start transaction neo4j;
            

            //Commit transaction
            session.commitTransaction();
            session.endSession();
            console.log("Transaction completed");
            return CreationResult;
        } catch (error) {
            session.abortTransaction();
            session.endSession();
            return null;
        }
        
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
            //Start transactie
            const results = await this.UserModel.findByIdAndUpdate({_id: Id}, changes, {new: true, overwrite: true});
            return results;
        } catch (error) {

            //Breekt transacties af.
            console.log(error);
            throw new Error();
        }
    }

    async OneUser(Id: string):Promise<User | null>{
        return this.UserModel.findById({_id: Id});
    }

    async Delete(Id: string){
        try {
            //Start transacties
            //Verwijder alle relaties in neo4j
            //Zet de auteur van ieder verhaal op null
            //Verwijder gebruiker
            return this.UserModel.deleteOne({_id: Id}, {new: true});
        } catch (error) {
            throw new Error(`Deletion has failed`);

        }
    }

}