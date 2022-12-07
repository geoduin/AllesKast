import { Injectable, NestMiddleware, NotAcceptableException } from "@nestjs/common";
import * as Jwt from 'jsonwebtoken';
import { environment } from "../../environments/environment";

const jwt:string = environment.Key;

@Injectable()
export class UserMiddleWare implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers.authorization;
        console.log("Middleware pass");
        if(!token){
            next();
            return;
        }

        try {
            const User = Jwt.verify(token, jwt);
            if(User){
                console.log("User is founded");
                console.log(User);
                req["User"] = User;
            }
            
        } catch (error) {
            throw new NotAcceptableException("Token verificatie is misgegaan");
        }
        next();
    }

}