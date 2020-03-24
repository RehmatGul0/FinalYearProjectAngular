import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from 'src/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  public getUserData():Observable<response<any[]>>{
    let headers = new HttpHeaders({'token':JSON.stringify(sessionStorage.getItem('user_token'))});
    let options = { headers: headers };
    return this.http.get<response<any[]>>(environment.appUrlUser+'/data/get-data',options);
  }
  public uploadTestFile(formData):Observable<any>{
    let headers = new HttpHeaders({'token':JSON.stringify(sessionStorage.getItem('user_token'))});
    let options = { headers: headers };
    return this.http.post<any>(environment.appUrlUser+'/data/upload-data',formData,options);
  }
}
