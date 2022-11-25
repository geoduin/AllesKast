import { Injectable } from "@angular/core";
import { CustomConfig } from "./WebHttp.module";

@Injectable({providedIn: "root"})
export class WebHttpService{
    constructor(private config: CustomConfig){
        console.log(`Config.forRoot in use ${config.apiEndpoint}`);
    }

    public getConfig(): CustomConfig{
        return this.config;
    }

    public getApiEndPoint():string{
        return this.config.apiEndpoint;
    }

}