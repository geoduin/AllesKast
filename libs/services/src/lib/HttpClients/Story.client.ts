import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { IStory, ResponseMessage, StoryDetail} from "data";
import { WebHttpService } from "../..";
import { EntityClientService } from "shared/entities";
import { map, of } from "rxjs";
//import { EntityClientService } from "./../../../../shared/entities/src/lib/Entities/Entity.client";

@Injectable({providedIn: "root"})
export class StoryClient extends EntityClientService<StoryDetail>{


    constructor(http: HttpClient, private WebRoutes: WebHttpService){
        super(http, WebRoutes.getApiEndPoint(), "/api/Stories");
        
    }

  
}