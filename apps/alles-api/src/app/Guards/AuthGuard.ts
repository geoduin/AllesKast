import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp();
        const request = host.getRequest();

        const User = request["User"];

        if(!User){
            console.log("Authorized not succeeded");
            throw new UnauthorizedException("Moet ingelogd zijn");
        }

        console.log("You shall PASSS");
        return true;
        
    }

}