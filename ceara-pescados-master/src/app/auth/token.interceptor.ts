import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenString = sessionStorage.getItem('access_token');

        const url = req.url;

        if( tokenString && !url.endsWith('/oauth/token') ){
            const token = JSON.parse(tokenString);
            const jwt = token.access_token;
            req = req.clone({
                setHeaders : {
                Authorization: 'Bearer ' + jwt
                }
            })
        }
        
        return next.handle(req);
    }

    
}