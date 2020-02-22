import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignIn } from 'src/interfaces/interfaces';
import { response } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signin(signIn):Observable<response<SignIn>>{
    return this.http.post<response<SignIn>>(environment.appUrlUser+'/auth/signin',signIn);
  }
  public signup(signUp):Observable<response<String>>{
    return this.http.post<response<String>>(environment.appUrlUser+'/auth/signup',signUp);
  }
}
