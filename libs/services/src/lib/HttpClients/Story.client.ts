import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { IStory} from "data";
import { WebHttpService } from "../..";
import { EntityClientService } from "shared/entities";
//import { EntityClientService } from "./../../../../shared/entities/src/lib/Entities/Entity.client";

@Injectable({providedIn: "root"})
export class StoryClient extends EntityClientService<StoryDetail>{
    constructor(http: HttpClient, private WebRoutes: WebHttpService){
        super(http, WebRoutes.getApiEndPoint(), "/api/Stories");
        
    }
  
}