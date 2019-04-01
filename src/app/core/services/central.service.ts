import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<any>{
    return this.http.get('https://pantanoapp.com.ar/api/pantanoquestions/all');
  }
}
