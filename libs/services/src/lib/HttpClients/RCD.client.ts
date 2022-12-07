import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseMessage } from "data";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../Auth/AuthService.service";
import { WebHttpService } from "../ConfigModules/WebHttp.service";

@Injectable({providedIn:"root"})
export class RecommendedClient{
    protected readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    BaseUrl: string;
    constructor(private http: HttpClient, private WebRoutes: WebHttpService, private authService: AuthService){
        this.BaseUrl = this.WebRoutes.getApiEndPoint() + "/api/RCS";
        
    }

    GetRecommendations(){
        const url = this.BaseUrl + "/Stories/Recommendations"

        return this.http.get(url).pipe(
            map((res)=>{
                console.log(res);
                const response = res as ResponseMessage;
                if(response.status == 201){
                    console.log("aanbevolen verhalen opgehaald");
                    return response.result.RC_Stories;
                } else{
                    return [];
                }
            })
        )
    }

    async FollowUser(TargetId: string):Promise<Observable<boolean>>{
        const url = this.BaseUrl + `/Users/${TargetId}/Follows`;
        console.log(url);
        return this.http.put(url, {}, {...this.headers}).pipe(
            map((res)=>{
                const message = res as ResponseMessage;
                if(message.status == 204){
                    return true
                } else{
                    return false;
                }
            }),
        )
    }

    async UnFollowUser(TargetId: string):Promise<Observable<boolean>>{
        const url = this.BaseUrl + `/Users/${TargetId}/Follows`;
        console.log(url);
        return this.http.delete(url, {...this.headers}).pipe(
            map((res)=>{
                const message = res as ResponseMessage;
                if(message.status == 204){
                    return true
                } else{
                    return false;
                }
            }),
        )
    }

    async FollowStory(TargetStoryId: string):Promise<Observable<boolean>>{
        const url = this.BaseUrl + `/Stories/${TargetStoryId}/Follows`;
        console.log(url);
        return this.http.put(url, {}, {...this.headers}).pipe(
            map((res)=>{
                const message = res as ResponseMessage;
                if(message.status == 204){
                    return true
                } else{
                    return false;
                }
            }),
        )
    }

    async UnFollowStory(TargetStoryId: string):Promise<Observable<boolean>>{
        const url = this.BaseUrl + `/Stories/${TargetStoryId}/Follows`;
        console.log(url);
        return this.http.delete(url, {...this.headers}).pipe(
            map((res)=>{
                const message = res as ResponseMessage;
                if(message.status == 204){
                    return true
                } else{
                    return false;
                }
            }),
        )
    }
}