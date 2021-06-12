import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password),
      }),
    };
    return this.http.get<User>(
      `${environment.api}/api/v1/users/acesso?login=${username}`,
      httpOptions
    );
  }

  getUsers(): Observable<User[]> {
    const httpOptions = this.getOptionsWithToken();
    return this.http.get<User[]>(
      environment.api + '/api/v1/users',
      httpOptions
    );
  }

  insert(user: User): Observable<string> {
    const httpOptions = this.getOptionsWithToken();
    return this.http.post<string>(
      `${environment.api}/api/v1/users`,
      user,
      httpOptions
    );
  }

  update(user: User): Observable<string> {
    const httpOptions = this.getOptionsWithToken();
    return this.http.put<string>(
      `${environment.api}/api/v1/users/${user.id}`,
      user,
      httpOptions
    );
  }

  private getOptionsWithToken() {
    const login = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + login,
      }),
    };
  }
}
