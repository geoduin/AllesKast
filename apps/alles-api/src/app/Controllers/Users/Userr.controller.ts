import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IdentityUser } from "data";
import { Error } from "mongoose";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";

@Controller("Users")
export class UserController{

    constructor(private repo: UserRepository){}

    @Post()
    async CreateUser(@Body() user: User){
        try {
            this.repo.Create(user);
            return {message: "Creation succeeded"};
        } catch (error:any) {
            return {message: "Creation failed", ErrorMessage: error.message};
        }
       
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
                return result;
            } else{
                return {message: "User not found"}
            }
            
        } catch (error) {
            return {message: error.message}
        }
        
    }

    @Put(":Id")
    async UpdateUser(@Param('Id') Id: string , @Body()user: Partial<IdentityUser>):Promise<any>{
        console.log("Update")
        console.log(user);
        try {
            return this.repo.Update(Id, user);
        } catch (error) {
            return {message: "Update failed", Failed: user}
        }
        
    }

    @Delete(":Id")
    async DeleteUser(@Param("Id") Id: string):Promise<any>{
        return this.repo.Delete(Id);
    }
}