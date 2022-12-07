import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { EditUserVM, IdentityUser } from "data";
import { Error } from "mongoose";
import * as Jwt from 'jsonwebtoken';
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import * as Bcrypt from 'bcrypt';
import { AuthGuard } from "../../Guards/AuthGuard";

@Controller("Users")
export class UserController{

    constructor(private repo: UserRepository){}

    @Get("Self")
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
    async UpdateUser(@Param('Id') Id: string , @Body()user: Partial<EditUserVM>):Promise<any>{
        console.log("Update")
        
        //Check if user sends a new password.
        if(user.EditPassword){
            user.Password = await Bcrypt.hash(user.PasswordConfirmation!, 12);
        }

        console.log(user);
        try {
            return this.repo.Update(Id, user as IdentityUser);
        } catch (error) {
            return {message: "Update failed", Failed: user}
        }
        
    }

    @Delete(":Id")
    @UseGuards(AuthGuard)
    async DeleteUser(@Param("Id") Id: string):Promise<any>{
        //Also a check if user is authorised to delete, update or edit own user.
        return this.repo.Delete(Id);
    }
}