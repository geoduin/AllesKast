import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IdentityUser } from "data";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { v4 as uuid } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    
    @Prop({default: uuid, index: true})
    Id!: string;

    @Prop({ required: true, unique: true, })
    UserName!: string;
    
    @Prop({required: true})
    Password!: string;
    
    @Prop({required: true})
    DateOfBirth!: Date;
    
    @Prop({required: true, unique: true})
    Email!: string;
    
    @Prop()
    Role!: string;

}

export const UserSchema = SchemaFactory.createForClass(User);