import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public uploadTestFile(formData):Observable<any>{
    return this.http.post<any>(environment.appUrlUser+'/userdataset',formData);
  }
  public getResults():Observable<any>{
    return this.http.get(environment.appUrlUser+'/question/getQuestion1',{ responseType: 'text' });
  }
}
