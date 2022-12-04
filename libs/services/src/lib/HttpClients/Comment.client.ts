import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IComment, ResponseMessage } from "data";
import { catchError, map, Observable, of } from "rxjs";
import { EntityClientService } from "shared/entities";
import { WebHttpService } from "../ConfigModules/WebHttp.service";

@Injectable({providedIn: "root"})
export class CommentClient extends EntityClientService<IComment>{
    host: string;
    CommentEndpoint = "/Comments"
    StoryEndpoint = "/api/Stories"
    
    constructor(public httpClient: HttpClient, public WebService: WebHttpService){
        super(httpClient, WebService.getApiEndPoint(), "/api/Stories")
        this.host = this.WebService.getApiEndPoint();
    }

    override CreateOne(NewStory: IComment, content: any): Observable<any> {
        const StoryId = content.StoryId;
        const Url = this.host + this.StoryEndpoint + `/${StoryId}${this.CommentEndpoint}`;
        console.log(Url);
        console.log(NewStory);
        const sub = this.httpClient
        .post(Url, NewStory, {...content ,...this.headers})
        .subscribe((result) => {
            console.log("Comment verzoek is verwerkt");
            
            sub.unsubscribe();
        })
        console.log(this.host + this.CommentEndpoint);
        return of(null);
    }

    override UpdateOne(Id: string, Updated: IComment, content: any) {
        const StoryId = content.StoryId;
        const CommentId = Id;
        const Url = this.host + this.StoryEndpoint + `/${StoryId}${this.CommentEndpoint}/${CommentId}`;
        const sub = this.httpClient
        .put(Url, Updated, {...this.headers})
        .subscribe((result)=>{
            const r = result as ResponseMessage;
            sub.unsubscribe();
            if(r.status != 204){
                return "Wijziging is mislukt";
            } else{
                return "Wijziging is succesvol";
            }
        })
    }

    getOne(CommentId: string, content: any){
        const StoryId = content.StoryId;
        const Url = this.host + this.StoryEndpoint + `/${StoryId}${this.CommentEndpoint}/${CommentId}`;
        return this.httpClient.get<ResponseMessage>(Url, {...content, ...this.headers})
        .pipe(
            map((res)=>{
                const r = res as unknown as ResponseMessage;
                if(r.status == 201){
                    return r.result;
                } else{
                    return null;
                }
            })
            ,
            catchError(this.handleError)
        )
    }

    override Delete(Id: string, content: any) {
        const StoryId = content.StoryId;
        const CommentId = Id;
        const Url = this.host + this.StoryEndpoint + `/${StoryId}${this.CommentEndpoint}/${CommentId}`;
        return this.httpClient.delete(Url, {...content, ...this.headers})
        .pipe(
            map((res)=>{
                if(res){
                    console.log("Deletion completed")
                    return true;
                }else{
                    console.log("Deletion failed")
                    return false;
                }
            }
            ),
            catchError(this.handleError)
            )
    }

    override GetAll(content: any): Observable<IComment[] | null> {
        const StoryId = content.StoryId;
        const Url = this.host + this.StoryEndpoint + `/${StoryId}${this.CommentEndpoint}`;
        return this.httpClient.get(Url).pipe(
            map((res)=>{
                if(res){
                    const r = res as unknown as ResponseMessage;
                    return r.result;
                } else{
                    return of(null);
                }
            }),
            catchError(this.handleError)
        )
    }
}