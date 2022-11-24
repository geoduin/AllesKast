import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IStory } from "data";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { WebHttpService } from "services";


export class EntityClientService<T>{

    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

    constructor(private http: HttpClient,public readonly ApiEndPoint: string, public readonly EntityUrl: string){
        console.log(this.ApiEndPoint + this.EntityUrl);
    }

    GetAll(content: any): Observable<T[]| null>{
        const url = this.ApiEndPoint + this.EntityUrl;
        return this.http.get<T[]>(url, {...this.headers})
        .pipe(
            tap(r => console.log(r)),
            map((list)=>{
                    return list;
                }
            ),
            catchError(this.handleError)
            )
    }

    GetOne(Id: string, content: any): Observable<T|null>{
        const url = this.ApiEndPoint  + this.EntityUrl + `/${Id}`;

        // will need to send it the token within header
        return this.http.get<T[]>(url, {...this.headers})
        .pipe(
            tap(r => console.log(r))
            ,
            map((Story)=>{
                    return Story;
                }
            ),
            catchError(this.handleError)
            )
    }

    CreateOne(NewStory: T, content: any):any{
        const url = this.ApiEndPoint  + this.EntityUrl;
        // will need to send it the token within header
        return this.http.post<T[]>(url, NewStory, {...this.headers})
        .pipe(
            tap(r => console.log(r))
            ,
            map((Story)=>{
                    return Story;
                }
            ),
            catchError(this.handleError)
            )
    };

    UpdateOne(Updated: T, content: any):any{
        const url = this.ApiEndPoint  + this.EntityUrl;
        // will need to send it the token within header
        return this.http.put<T[]>(url, Updated, {...this.headers})
        .pipe(
            tap(r => console.log(r))
            ,
            map((UpdatedStory)=>{
                    return UpdatedStory;
                }
            ),
            catchError(this.handleError)
            )
    };

    Delete(Id:string, content: any):any{
        const url = this.ApiEndPoint  + this.EntityUrl + `/${Id}`
        // will need to send it the token within header
        return this.http.delete<T[]>(url,{...this.headers})
        .pipe(
            tap(r => console.log(r))
            ,
            map((Result)=>{
                    return Result;
                }
            ),
            catchError(this.handleError)
            )
    };

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log(error)
    
        const errorResponse = {
          type: 'error',
          message: error.error.message || error.message
        }
        // return an error observable with a user-facing error message
        return throwError(errorResponse)
      }


}