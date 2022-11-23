import { ENVIRONMENT_INITIALIZER, Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map, Observable, of, pipe, throwError } from "rxjs";
import { EditUserVM, IdentityUser, SiteUser } from "data";
import { env } from "process";
import { WebHttpService } from "../ConfigModules/WebHttp.service";

const httpOptions = {
    observe: 'body',
    responseType: 'json'
  }
  

@Injectable({providedIn: "root"})
export class UserClient{
    private readonly AllEndpoint = "/api/Users"
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });


    constructor(private client: HttpClient, private WebRoutes: WebHttpService){}

    Test():string{
        return this.WebRoutes.getApiEndPoint();
    }

    GetAll(): Observable<SiteUser[]>{
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}`;
        console.log(url);
        return this.client.get<SiteUser[]>(url, {...this.headers}).pipe(
            map((list)=>{
                return list;
            }),
            catchError(this.handleError)
        )
    }

    GetOne(Id: string):Observable<IdentityUser>{
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}/${Id}`;
        return this.client.get<IdentityUser>(url, {...this.headers}).pipe(
            map((list)=>{
                return list;
            })
        )
    }

    async CreateOne(newUser: IdentityUser){
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}`;
        return this.client.post<IdentityUser>(url, newUser).pipe(
            map((res)=>{
                return res;
            }),
            catchError(this.handleError)
        )
    }

    UpdateOne(Id: string, user: EditUserVM){
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}/${Id}`;
        return this.client.put<IdentityUser>(url, user).pipe(
            map((user)=>{
                return user;
            })
        )
    }

    DeleteOne(Id: string){
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}/${Id}`;
        return this.client.delete<IdentityUser>(url).pipe(
            map((user)=>{
                return user;
            })
        )
    }

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