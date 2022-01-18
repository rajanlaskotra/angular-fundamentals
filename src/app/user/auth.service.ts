import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { catchError, last, tap } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: HttpClient){

    }
    loginUser(userName: string, password: string) {
        let loginInfo = { username: userName, password: password }  //defined in server(backend) in this manner
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

        return this.http.post('/api/login', loginInfo, options)
                .pipe(
                        tap(data => { this.currentUser = <IUser>data['user'] }),
                        catchError(err => { console.error(err); return of([]) })
                )  
    }

    logoutUser() {
        this.currentUser = undefined

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        return this.http.post('/api/logout', {}, options) //custom server(ngf-server) end-point designed in this manner, but generally any http method would work.
    }

    //persisting authentication status across refreshes.
    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')       //custom server(ngf-server) returns 'user' object if loggedIn, otherwise null
          .pipe(tap(data => { this.currentUser = <IUser>data }))
          .subscribe()
    }

    updateUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }

    isAuthenticated() {
        return !!this.currentUser
    }
}