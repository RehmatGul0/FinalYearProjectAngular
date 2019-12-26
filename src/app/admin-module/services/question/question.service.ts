import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { response } from 'src/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  public AddQuestion(question):Observable<response<String>>{
    return this.http.post<response<String>>(environment.appUrlAdmin+'/question/add',question);
  }
  public getQuestions():Observable<response<any>>{
    return this.http.get<response<any>>(environment.appUrlAdmin+'/question/get');
  }
  
}
