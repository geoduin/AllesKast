import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    
    constructor(private allowedRoles: string[]){

    }
    
    canActivate(context: ExecutionContext): boolean {

        const host = context.switchToHttp();
        const request = host.getRequest();

        const User = request["User"];

        const Allowed = this.IsAllowed(User.roles);
        if(!Allowed){
            throw new ForbiddenException("Verboden toegang op deze endpoint");
        }

        console.log("Toegang toegestaan");
        return true;
    }

    IsAllowed(UserRoles: string):boolean{
        console.log("Authorization role is busy");

        let allowed = false;
        /* 
        UserRoles.forEach((roles)=>{
            if(this.allowedRoles.includes(roles)){
                console.log("Has authorization");
                allowed =  true;
            }
        })
        return allowed;
        */
        if(this.allowedRoles.includes(UserRoles)){
            console.log("Has authorization");
            allowed =  true;
        }
        return allowed;
    }
}