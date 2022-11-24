import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { EntityClientService } from "./Entity.Client";
import { IStory, StoryDetail } from "data";
import { ConfigModule } from "../ConfigModules/WebHttp.module";
import { WebHttpService } from "services";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class StoryClient extends EntityClientService<IStory>{
    constructor(http: HttpClient, private WebRoutes: WebHttpService){
        super(http, WebRoutes.getApiEndPoint(), "/api/Stories");
        
    }
  
}