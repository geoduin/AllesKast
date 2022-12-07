import { BadRequestException, HttpException, Injectable, Logger, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IdentityUser} from "data";
import mongoose, { ClientSession, isValidObjectId, Model, startSession} from "mongoose";
import { ManagedTransaction, Transaction } from "neo4j-driver";
import { Neo4jService, TransactionWork } from "../Neo4J/neo4j.service";
import { Chapter } from "../Schema/PageSchema";
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
        return this.UserModel.findById(Id);
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

    async FollowUser(YourUserId: string, TargetId: string){
        
        
        const TargetUser = await this.UserModel.findById(TargetId);
        const YourUser = await this.UserModel.findById(YourUserId);
        if(!TargetUser || !YourUser){
            throw new NotFoundException("Gezochte gebruiker is niet gevonden");
        }

        const list = YourUser?.FollowUserlist;
        
        if(list.includes(TargetUser._id)){
            throw new BadRequestException("Gebruiker heeft al deze gebruiker gevolgd");
        }
        list.push(TargetUser._id)
        await YourUser?.save();

        
        return YourUser;
    }

    async UnfollowUser(YourUserId: string, TargetId: string){
        Logger.debug(`Onvolg functie door Eigen gebruiker met Id: ${YourUserId} die een gebruiker ontvolgt met Id ${TargetId}`);
        const TargetUser = await this.UserModel.findById(TargetId);
        
        if(!TargetUser){
            throw new NotFoundException("Gezochte gebruiker is niet gevonden");
        }
        
        //Ontvolgd gebruiker uit volg lijst.
        const YourUser = await this.UserModel.findByIdAndUpdate(YourUserId, { $pull: {'FollowUserlist': new mongoose.Types.ObjectId(TargetId)}});

        return YourUser;

    }

    async FollowStory(YourUserId: string, TargetId: string){
        const YourUser = await this.UserModel.findById(YourUserId);
        if(!YourUser){
            throw new NotFoundException("Gezochte gebruiker is niet gevonden.");
        }
        
        if(YourUser.StoryFollowedlist.includes(TargetId)){
            throw new NotFoundException("Een gebruiker volgt dit verhaal al.")
        } 
            YourUser.StoryFollowedlist.push(TargetId);

            YourUser.save();
            return YourUser;

    }
    
    async UnFollowStory(YourUserId: string, TargetId: string){
        console.log("Unfollowed gebruiker");
        const updated = await this.UserModel.findByIdAndUpdate(YourUserId, {$pull: {'StoryFollowedlist': TargetId}});
        if(!updated){
            throw new NotFoundException("Gezochte gebruiker is niet gevonden.")
        }
        return updated;
    }

}