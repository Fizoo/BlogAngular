import {Injectable} from '@angular/core';
import {IFbAuthResponse, IUser} from "../../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn:'root'
})
export class AuthService {
  public error$:Subject<string> = new Subject();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expToken = localStorage.getItem('fb-token-exp')
    if (expToken) {
      const expDate = new Date(expToken)
      if (new Date() > expDate) {
        this.logout()
        return null
      }
    }
    return localStorage.getItem('fb-token')
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((el: any) => this.setToken(el)),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
    }

    if (message) {
      console.log(message)
    }
    return throwError(error)
  }

  private setToken(response: IFbAuthResponse | null) {
    if (response) {
      const timeNow = new Date().getTime()
      const expDate = new Date(timeNow + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
      console.log('setToken', expDate)
    } else {
      localStorage.clear()
    }

  }


}
