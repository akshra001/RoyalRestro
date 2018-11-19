import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthenticateService {
  constructor(private http: HttpClient) { }

  login(value) {
    debugger
    // const headers = new HttpHeaders({ 'No-Auth': 'True' });
    // headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`http://ShivaniChaudhry:8083/login`, { username: value.username, password: value.password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.response) {
          console.log('user details', user);
          debugger
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}