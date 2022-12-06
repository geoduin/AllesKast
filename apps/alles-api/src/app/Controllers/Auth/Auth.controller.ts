import { Body, Controller, Post} from "@nestjs/common";
import { UserRepository } from "../../Data/Repositories/User.Repository";
import { User } from "../../Data/Schema/UserSchema";
import * as jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcrypt';
import { LoginModel } from "data";
import { Neo4jService } from "../../Data/Neo4J/neo4j.service";

@Controller("Profile")
export class AuthController{
    
    constructor(private UserRepo: UserRepository){ }

    @Post("Login")
    async Login(@Body() loginData: LoginModel):Promise<User | any>{
        try {
            //Retrieve user from database
            const user:any = await this.UserRepo.GetLoginUser(loginData.UserName);
            
            //If user is not found, send back 404 status back
            if(!user){
                throw new Error("Gebruiker niet gevonden");
            } else {
                //Checks if password is valid.
                const match = await Bcrypt.compare(loginData.Password, user.Password);
                //Return token
                if(match){
                    //Sign a token.
                    const Token = jwt.sign({Id: user._id, Role: user.Role}, process.env["JWT_KEY"]!, {expiresIn: "20d"});
                    user.Password = undefined; 
                    return {status: 200, result: user, Token: Token};
                } else{
                    throw new Error("Onjuiste gegevens ingevoerd");
                }  
            } 
        } catch (error: any) {
            return {status: 400, Message: "Retrieval failure", Error: error.message};
        }
    }

    @Post("Registration")
    async CreateUser(@Body() user: User){

        //Start transaction
        console.log("User api creation started");
        //Hash wachtwoord
        const hashedPassword = await Bcrypt.hash(user.Password, 12);
        //Wijst gehashed wachtwoord terug.
        user.Password = hashedPassword;

        console.log("User api creation started");
        console.log(user);

        const result = await this.UserRepo.Create(user);
        if(result){
            return {message: "Creation succeeded", result: result};
        } else{
            return {message: "User creation failed"};
        }
        //Geef gebruiker terug.
        
    }
}
