import { Prop, Schema } from "@nestjs/mongoose";
import { IdentityUser } from "data";
import { v4 as uuid } from 'uuid';
@Schema()
export class UserSchema{
    @Prop({default: uuid, index: true})
    Id: string | undefined;
    
    @Prop({required: true, unique: true,})
    UserName: string | undefined;
    
    @Prop({required: true})
    Password: string | undefined;
    
    @Prop({required: true})
    DateOfBirth: Date | undefined;
    
    @Prop({required: true, unique: true})
    Email: string | undefined;
    
    @Prop()
    Role: string | undefined;

}