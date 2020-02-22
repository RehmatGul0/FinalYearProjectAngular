import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response, SignIn } from 'src/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signin(signIn):Observable<response<SignIn>>{
    return this.http.post<response<SignIn>>(environment.appUrlAdmin+'/auth/signin',signIn);
  }
}
