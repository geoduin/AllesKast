import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChapterDetails, IChapter } from "data";
import { catchError, map, Observable } from "rxjs";
import { EntityClientService } from "shared/entities";
import { WebHttpService } from "../ConfigModules/WebHttp.service";

@Injectable({providedIn: "root"})
export class ChapterClient extends EntityClientService<ChapterDetails>{
    
    httpClient: HttpClient
    ExtraEndpoint: string;
    BaseEndpoint: string;
    constructor(http: HttpClient, private WebRoutes: WebHttpService){
        super(http, WebRoutes.getApiEndPoint(), "/api/Stories");
        this.httpClient = http;
        this.BaseEndpoint = "/api/Stories";
        this.ExtraEndpoint = "/Chapters";
    }
    
    Create(StoryId: string, NewStory: ChapterDetails, content: any) {
        const Url = `${this.WebRoutes.getApiEndPoint()}${this.BaseEndpoint}/${StoryId}${this.ExtraEndpoint}`
        console.log(Url);
        const dto = {Chapter: NewStory, Pages: []}
        return this.httpClient
        .post<ChapterDetails>(Url, dto, {...super.headers})
        .pipe((waarde)=>{
            console.log(waarde);
            return waarde;
        },
        catchError(this.handleError));
    }

    Get(StoryId: string, ChapterId: string, content: any): Observable<any> {
        const Url = `${this.WebRoutes.getApiEndPoint()}${this.BaseEndpoint}/${StoryId}${this.ExtraEndpoint}/${ChapterId}`
        return this.httpClient
        .get<ChapterDetails | null>(Url, {...super.headers})
        .pipe((waarde)=>{
            console.log(waarde);
            return waarde;
        })
    }

    Update(StoryId: string, ChapterId: string, Updated: ChapterDetails, content: any) {
        const Url = `${this.WebRoutes.getApiEndPoint()}${this.BaseEndpoint}/${StoryId}${this.ExtraEndpoint}/${ChapterId}`
        const dto = {Chapter: Updated, Pages: []}
        return this.httpClient
        .put<ChapterDetails | null>(Url, dto, {...super.headers})
        .pipe((waarde)=>{
            console.log(waarde);
            return waarde;
        })
    }

    Remove(StoryId: string, ChapterId: string, content: any) {
        const Url = `${this.WebRoutes.getApiEndPoint()}${this.BaseEndpoint}/${StoryId}${this.ExtraEndpoint}/${ChapterId}`
        return this.httpClient
        .delete<ChapterDetails | null>(Url, {...super.headers})
        .pipe((waarde)=>{
            console.log(waarde);
            return waarde;
        })
    }

    All(StoryId: string, content: any): Observable<any| null> {
        const QParams = new HttpParams().set("WantImage", content.WantImage);
        const params = {params: QParams};
        const Url = `${this.WebRoutes.getApiEndPoint()}${this.BaseEndpoint}/${StoryId}${this.ExtraEndpoint}`
        console.log(Url);
        return this.httpClient
        .get<IChapter | null>(Url,  {...QParams ,...super.headers})
        .pipe((waarde)=>{
            console.log("Lijst")
            console.log(waarde);
            return waarde;
        })
    }
    
  
}