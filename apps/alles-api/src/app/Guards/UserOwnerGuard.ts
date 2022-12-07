import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRepository } from "../Data/Repositories/User.Repository";

@Injectable()
export class UserOwnGuard implements CanActivate{

    constructor(private UserRepo: UserRepository){

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const host = context.switchToHttp();
        const request = host.getRequest();

        //Receives token from request body
        const User = request["User"];
        console.log("Gepasseerd door de owner guard gebruiker");
        const UserResult = await this.UserRepo.OneUser(User.Id);

        if(UserResult){
            return UserResult._id == User.Id;
        } 
        return false;
    }

}