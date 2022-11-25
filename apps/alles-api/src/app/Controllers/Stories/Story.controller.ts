import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IdentityUser } from "data";
import { StoryRepository } from "../../Data/Repositories/Story.Repository";
import { Story } from "../../Data/Schema/Story.Schema";
import { User } from "../../Data/Schema/UserSchema";

@Controller("Stories")
export class StoryController{

    constructor(private repo: StoryRepository){}

    @Post()
    async CreateUser(@Body() user: Story){
        try {
            console.log("User api creation started");
            console.log(user);
            const answer = await this.repo.Create(user);
            console.log("Story creation ended");
            console.log(answer);
            return {message: "Creation succeeded", result: answer};
        } catch (error:any) {
            return {message: "Creation failed", ErrorMessage: error.message};
        }
       
    }

    @Get()
    async AllUsers():Promise<Story[] | unknown>{
        return this.repo.GetAll();
    }

    @Get(":Id")
    async OneUser(@Param('Id') Id: string):Promise<any>{
        try {
            const result = await this.repo.GetOne(Id);
            if(result){
                return result;
            } else{
                return {message: "User not found"}
            }
            
        } catch (error) {
            return {message: error}
        }
        
    }

    @Put(":Id")
    async UpdateUser(@Param('Id') Id: string , @Body()story: Partial<Story>):Promise<any>{
        console.log("Update")
        console.log(story);
        try {
            return this.repo.Update(Id, story);
        } catch (error) {
            return {message: "Update failed", Failed: story}
        }
        
    }

    @Delete(":Id")
    async DeleteUser(@Param("Id") Id: string):Promise<any>{
        return this.repo.Delete(Id);
    }
}