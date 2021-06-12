import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const login = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + login,
      }),
    };
    return this.http.get<User[]>(
      environment.api + '/api/v1/users',
      httpOptions
    );
  }

  login(username: string, password: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password),
      }),
      responseType: 'text' as 'json'
    };
    return this.http.get<string>(environment.api + '/api/v1/users/login', 
      httpOptions
      
    );
  }
}
