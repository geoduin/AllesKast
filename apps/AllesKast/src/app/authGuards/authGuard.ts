import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../../../../libs/services/src";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate{
    
    constructor(private authServe: AuthService, private Router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        
        if(!this.authServe.IsLoggedIn$.getValue()){
            console.warn('Moet ingelogd zijn');
            this.Router.navigate([".."]);
            return false;
        } else{
            return true;
        }
        
    }

}