import { Injectable, NestMiddleware } from "@nestjs/common";
import * as Jwt from 'jsonwebtoken';

const jwt = "Toilet";

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
                req["User"] = User;
            }
            
        } catch (error) {
            console.log("Error handling")
        }
        next();
    }

}