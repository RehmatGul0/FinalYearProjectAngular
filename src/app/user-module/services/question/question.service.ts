import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { response, GetDomain } from 'src/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  public getQuestion():Observable<response<any[]>>{
    
    return this.http.get<response<any[]>>(environment.appUrlUser+'/question/get');
  }
  public getResults(question):Observable<any>{
    let headers = new HttpHeaders({'token':JSON.stringify(sessionStorage.getItem('user_token')) });
    return this.http.post(environment.appUrlUser+'/question/getAnswer',question,{headers,responseType: 'text' });
  }
  
}
