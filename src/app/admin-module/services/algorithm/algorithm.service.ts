import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAlgorithm, response } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private http: HttpClient) {
  }
   public getAlgorithm():Observable<response<GetAlgorithm[]>>{
      return this.http.get<response<GetAlgorithm[]>>(environment.appUrlAdmin+'/algorithm/get');
   }
   public addAlgorithm(algorithm){
    return this.http.post<response<String>>(environment.appUrlAdmin+'/algorithm/add',algorithm);
  }

}
