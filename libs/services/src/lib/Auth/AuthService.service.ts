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
    public IsLoggedIn$ = new BehaviorSubject<boolean>(false);

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
                    this.IsLoggedIn$.next(true);
                    return of(user);
                } else{
                    this.IsLoggedIn$.next(false);
                    console.warn("Geen gebruiker gevonden");
                    return of(undefined);
                }
            })
        ).subscribe(()=>console.log("User login is begonnen"))

    }

    RefreshUser(){
        const url = this.webService.getApiEndPoint() + "/api/Users/Self";
        console.log(url);
        return this.Client.get(url).pipe(
            map((res: any)=>{
                console.log(res);
                
                if(res.status == 201){
                    const response = res.result;
                    this.CurrentUser$.next(response);
                    this.StoreUserInLocalDb(response);
                    return "Opgeslagen";
                } else{
                    return this.Logout();
                }
            })
        )
    }

    //Als een gebruiker aanwezig is in de database, controlleer of the gebruiker of een verhaal of persoon volgt.
    HasFollowed(targetId: string):Observable<boolean>{
        return this.GetUserFromLocalDb().pipe(
            map((val)=>{
                
                if(val){
                    return val.FollowUserlist.filter((s)=> s._id == targetId).length > 0 || val.StoryFollowedlist.filter((s)=> s._id == targetId).length > 0;
                } else{
                    return false;
                }
            })
        )
    }

    LoginStatus():boolean{
        if(this.CurrentUser$.getValue()){
            return true;
        } else{
            return false;
        }
    }

    GetDirectUser(): PrivateUser | undefined{
        const User = localStorage.getItem(this.UserKey);
        if(User){
            return JSON.parse(User);
        } else{
            return undefined;
        }
        
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

        return this.Client.post(url, LoginForm, {...this.headers}).pipe(
            map((data: any)=>{ 
                console.log("Login verliep succesvol");
                console.log(data);
                if(data.status == 200){
                    const User = data.result;
                    this.StoreToken(data.Token);
                    this.StoreUserInLocalDb(User);
                    this.CurrentUser$.next(User);
                    console.log(User);
                    this.routers.navigate(["/"]);
                    this.IsLoggedIn$.next(true);
                    console.log("Succesvol ingelogd");
                    return true;
                }else{
                    console.log("Onjuiste gegevens ingevoerd");
                    return false;
                }
            }),
            catchError((error)=>{
                console.log(error);
                return error;
            })
        );
    }
    
    //Uitloggen.
    Logout(){
        this.RemoveToken();
        this.RemoveUserFromLDb();
        this.CurrentUser$.next(undefined);
        this.IsLoggedIn$.next(false);
        this.routers.navigate(["/"]);
        return "Uitgelogd";
    }

    IsEditable(objectUserId: string):Observable<boolean>{
        return this.GetUserFromLocalDb().pipe(
            map((val)=>{
                return val?._id == objectUserId;
            })
        )
    }
}