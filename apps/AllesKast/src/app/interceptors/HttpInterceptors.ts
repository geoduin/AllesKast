import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class HttpInterceptors implements HttpInterceptor{
    
    intercept(req: HttpRequest<boolean>, next: HttpHandler): Observable<HttpEvent<boolean>> {
        const jwt = localStorage.getItem("TokenKey");
        throw new Error("Method not implemented.");
    }

}