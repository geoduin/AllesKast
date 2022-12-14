import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { EditUserVM, IdentityUser, ResponseMessage } from "data";
import { Error } from "mongoose";
import * as Jwt from 'jsonwebtoken';
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import * as Bcrypt from 'bcrypt';
import { AuthGuard } from "../../Guards/AuthGuard";
import { UserOwnGuard } from "../../Guards/UserOwnerGuard";

@Controller("Users")
export class UserController{

    constructor(private repo: UserRepository){}

    @Get("Self")
    @UseGuards(UserOwnGuard)
    @UseGuards(AuthGuard)
    async GetProfile(@Req() req: any){

        const Ids = req["User"];
        console.log(Ids);
        //Retrieve UserId from token.
        //const token = header.get()
        const User = await this.repo.OneUser(Ids.Id);
        return {status: 201, result: User}
    }

    @Get()
    async AllUsers():Promise<User[]>{
        return this.repo.All();
    }

    @Get(":Id")

    async OneUser(@Param('Id') Id: string):Promise<any>{
        try {
            const result = await this.repo.OneUser(Id);
            if(result){
                return {status: 201,result};
            } else{
                return {message: "User not found"}
            }
            
        } catch (error) {
            return {message: error}
        }
        
    }

    @Put(":Id")
    @UseGuards(AuthGuard)
    async UpdateUser(@Param('Id') Id: string , @Body()user: Partial<EditUserVM>):Promise<ResponseMessage>{
        console.log("Update")
        
        //Check if user sends a new password.
        if(user.EditPassword){
            user.Password = await Bcrypt.hash(user.PasswordConfirmation!, 12);
        }

        console.log(user);
        try {
            const res =  await this.repo.Update(Id, user as IdentityUser);
            return {status: 201, message: "Update voltooid", result: res}
        } catch (error) {
            return {status: 405, message: "Update failed", result: user}
        }
        
    }

    @Delete(":Id")
    @UseGuards(AuthGuard)
    async DeleteUser(@Param("Id") Id: string):Promise<ResponseMessage>{
        //Also a check if user is authorised to delete, update or edit own user.
        const result = await this.repo.Delete(Id);
        return {status: 201, message: "Deletion succeeded", result: true};
    }
}