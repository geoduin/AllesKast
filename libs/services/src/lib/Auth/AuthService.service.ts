import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel, PrivateUser } from "data";
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from "rxjs";
import { WebHttpService } from "../ConfigModules/WebHttp.service";
import { UserClient } from "../HttpClients/User.client";
import { Router } from "@angular/router";;
@Injectable()
export class AuthService{
    //User to store during session
    public CurrentUser$ = new BehaviorSubject<PrivateUser | undefined>(undefined);
    public Key = "TokenKey";
    public UserKey = "UserKey";
    public LoginEndpoint = "/api/Profile/Login";
    public RegistrationEndpoint = "/api/Profile/Registration";
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      
    constructor(private Client: HttpClient, private webService: WebHttpService, private routers: Router){
        this.GetUserFromLocalDb()
        .pipe(
            map( (user)=>{
                if(user){
                    console.warn("Gebruiker gevonden");
                    //Haal token op om zichzelf te verversen.

                    //Haal geupdated versie van de gebruiker op.
                    this.CurrentUser$.next(user);
                    return of(user);
                } else{
                    console.warn("Geen gebruiker gevonden");
                    return of(undefined);
                }
            })
        ).subscribe(()=>console.log("User login is begonnen"))

    }

    GetUserFromLocalDb(): Observable<PrivateUser | undefined>{
        const UserData = localStorage.getItem(this.UserKey);
        //Als het bestaat, 
        if(UserData){
            const User = JSON.parse(UserData);
            return of(User);
        } else{
            //Als er geen ingelogde gebruiker aanwezig is.
            return of(undefined);
        }
    }

    StoreUserInLocalDb(user: PrivateUser){
        const stringJsonUser: string = JSON.stringify(user);
        localStorage.setItem(this.UserKey, stringJsonUser);
    }
    RemoveUserFromLDb(){
        localStorage.removeItem(this.UserKey);
    }

    //Opslaan token in localstorage
    StoreToken(jwt: string){
        localStorage.setItem(this.Key, jwt);
    }
    //Verwijderen token uit localstorage
    RemoveToken(){
        localStorage.removeItem(this.Key);
    }

    //Ophalen van token
    GetToken(){
        return localStorage.getItem(this.Key);
    }

    //Controleren of er token is
    //Controleren of token geldig is.

    //Inloggen
    Login(LoginForm: LoginModel){
        console.log(`Login: ${LoginForm.UserName} en wachtwoord: ${LoginForm.Password}`);
        const url = this.webService.getApiEndPoint() + this.LoginEndpoint;
        console.log(url);
        this.Client.post(url, LoginForm, {...this.headers}).pipe(
            map((data: any)=>{ 
                console.log("Login verliep succesvol");
                const User = data.result;
                this.StoreToken(data.Token);
                this.StoreUserInLocalDb(User);
                console.log(User);
                this.routers.navigate(["/"]);
                console.log("Succesvol ingelogd");
            }),
            catchError((error)=>{
                console.log(error);
                return of(undefined);
            })
        ).subscribe();
    }
    
    //Uitloggen.
    Logout(){
        this.RemoveToken();
        this.RemoveUserFromLDb();
        this.CurrentUser$.next(undefined);
        this.routers.navigate(["/"]);
    }

    IsEditable(objectUserId: string):Observable<boolean>{
        return this.GetUserFromLocalDb().pipe(
            map((val)=>{
                return val?._id == objectUserId;
            })
        )
    }
}