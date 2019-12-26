import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { response } from 'src/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelInfoService {

  constructor(private http: HttpClient) { }
  public AddModelInfo(modelInfo):Observable<response<String>>{
    return this.http.post<response<String>>(environment.appUrlAdmin+'/modelInfo/add',modelInfo);
  }
  public getModelInfo():Observable<response<any>>{
    return this.http.get<response<any>>(environment.appUrlAdmin+'/modelInfo/get');
  }
}
