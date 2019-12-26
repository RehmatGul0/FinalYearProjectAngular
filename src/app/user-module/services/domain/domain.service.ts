import { GetDomain } from './../../../../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { response } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private http: HttpClient) { }

  public getDomain():Observable<response<GetDomain[]>>{
    return this.http.get<response<GetDomain[]>>(environment.appUrlAdmin+'/domain/get');
  }
}
