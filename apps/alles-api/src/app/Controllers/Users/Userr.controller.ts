import { Controller, Get, Put } from "@nestjs/common";

@Controller()
export class UserController{

    @Get()
    async AllUsers():Promise<any[]>{
        return [];
    }

    @Get()
    async OneUser():Promise<any>{
        return [];
    }

    @Put()
    async UpdateUser():Promise<any>{
        return [];
    }

    @Get()
    async DeleteUser():Promise<any>{
        return [];
    }
}