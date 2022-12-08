import { ENVIRONMENT_INITIALIZER, Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map, Observable, of, pipe, throwError } from "rxjs";
import { EditUserVM, IdentityUser, PrivateUser, ResponseMessage, SiteUser } from "data";
import { env } from "process";
import { WebHttpService } from "../..";
const httpOptions = {
    observe: 'body',
    responseType: 'json'
  }
  

@Injectable({providedIn: "root"})
export class UserClient{
    private readonly AllEndpoint = "/api/Users"
    private readonly RegistrationEndpoint = "/api/Profile/Registration";
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

    GetOne(Id: string):Observable<PrivateUser>{
        const url = `${this.WebRoutes.getApiEndPoint()}${this.AllEndpoint}/${Id}`;
        console.log(url);
        return this.client.get(url, {...this.headers}).pipe(
            map((list)=>{
                const res = list as ResponseMessage;
                console.log(list);
                return res.result;
            })
        )
    }

    CreateOne(newUser: IdentityUser): Observable<any>{
        const url = `${this.WebRoutes.getApiEndPoint()}${this.RegistrationEndpoint}`;
        return this.client.post(url, newUser).pipe(
            map((res:any)=>{
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
        return this.client.delete(url).pipe(
            map((user)=>{
                const result = user as any;
                return result;
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