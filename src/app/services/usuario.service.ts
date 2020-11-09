import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, retry } from 'rxjs/operators';
import { LoginResponse } from 'src/shared/models/responses/login.response';
import { Observable } from 'rxjs';
import { RequestLoginBody } from 'src/shared/models/request/login.request';
import { Categoria } from 'src/shared/models/domain/categoria';
import { RequestRegisterBody } from 'src/shared/models/request/register.request';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<LoginResponse> {
    
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = new RequestLoginBody(username, password);

    let options = {
      headers: httpHeaders
    }

    return this
            .http
              .post<LoginResponse>(environment.API_ENDPOINT + '/login', body, {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<LoginResponse>) => response.body)
              );
  }

  public register(username: string, password: string, permiso: string, mail: string, categoria: Categoria, nombre: string): Observable<Response> {
    
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const idCategoria = (categoria) ? categoria.idCategoria : null;

    let body = new RequestRegisterBody(username, password, permiso, mail, idCategoria, nombre);

    let options = {
      headers: httpHeaders
    }

    console.log(body);

    return this
            .http
              .post<Response>(environment.API_ENDPOINT + '/register', body, {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<Response>) => response.body)
              );
  }
}
