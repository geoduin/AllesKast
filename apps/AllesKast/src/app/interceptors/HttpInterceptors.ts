import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class HttpInterceptors implements HttpInterceptor{
    
    intercept(req: HttpRequest<boolean>, next: HttpHandler): Observable<HttpEvent<boolean>> {
        const jwt = localStorage.getItem("TokenKey");

        if(jwt){
            console.log("Token is aanwezig");
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `${jwt}`)
            });

            return next.handle(cloned);
        }else{
            console.log("Interceptor heeft geen token");
            return next.handle(req);
        }
    }

}