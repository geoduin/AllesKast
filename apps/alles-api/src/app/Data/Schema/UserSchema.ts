import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IdentityUser } from "data";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { v4 as uuid } from 'uuid';
import { Story } from "./Story.Schema";

export type UserDocument = HydratedDocument<User>;

const roleTypes = ["Regular", "Admin", "Boss"]

@Schema()
export class User{
    _id: string | undefined;
    
    @Prop({type: String , default: uuid, index: true})
    Id!: string;

    @Prop({type: String, required: true, unique: true, })
    UserName!: string;
    
    @Prop({type: String, required: true})
    Password!: string;
    
    @Prop({type: Date ,required: true})
    DateOfBirth!: Date;
    
    @Prop({type: String, required: true, unique: true})
    Email!: string;
    
    @Prop({type: String, default: "REGULAR"})
    Role!: string;

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: 'User', unique: true}], default: []})
    FollowUserlist!:  mongoose.Types.ObjectId[];

    @Prop({ type: [{type: mongoose.Types.ObjectId, ref: 'Story', unique: true }], default: []})
    StoryFollowedlist!:  mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);