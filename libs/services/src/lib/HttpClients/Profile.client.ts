import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityClientService } from "shared/entities";
import { AuthService } from "../Auth/AuthService.service";
import { WebHttpService } from "../ConfigModules/WebHttp.service";

@Injectable({providedIn:"root"})
export class ProfileClient{

    constructor(private http: HttpClient, private WebRoutes: WebHttpService, private authService: AuthService){
    }
}