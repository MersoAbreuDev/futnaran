import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TermosService {
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  acceptTerm(payload: any) {
    return this.http.post(`${this.url}/aceitar`, payload);
  }
}
