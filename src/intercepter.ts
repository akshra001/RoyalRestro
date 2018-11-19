import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (request.headers.get('No-Auth') == "True")
        //     return next.handle(request.clone());
        if (currentUser && currentUser.response) {
            const clone = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.response}`
                }
            });
            
            // let req = request.clone({
            //     headers: new HttpHeaders().append('Authorization ', `Bearer ${currentUser.response}`)
            // });
           return  next.handle(clone);
        }
        else{
            return next.handle(request);
        }

        // return next.handle(request);
    }
}