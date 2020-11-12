import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, retry } from 'rxjs/operators';
import { LoginResponse } from 'src/shared/models/responses/login.response';
import { Observable } from 'rxjs';
import { RequestLoginBody } from 'src/shared/models/request/login.request';
import { Categoria } from 'src/shared/models/domain/categoria';
import { RequestRegisterBody } from 'src/shared/models/request/register.request';
import { GetUsuariosResponse } from '../models/responses/proveedores.response';
import { Usuario } from '../models/domain/usuario';
import { GetUsuarioResponse } from '../models/responses/usuario.response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  public register(username: string, password: string, permiso: string, mail: string, idCategoria: number, nombre: string): Observable<Response> {
    
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = new RequestRegisterBody(username, password, permiso, mail, idCategoria, nombre);

    let options = {
      headers: httpHeaders
    }

    return this
            .http
              .post<Response>(environment.API_ENDPOINT + '/register', body, {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<Response>) => response.body)
              );
  }

  public getAllUsuarios(): Observable<GetUsuariosResponse> {
    let token = localStorage.getItem('token');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this
            .http
              .get<GetUsuariosResponse>(environment.API_ENDPOINT + '/usuarios', {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<GetUsuariosResponse>) => response.body)
              );
  }

  public getUsuario(): Observable<GetUsuarioResponse> {
    let token = localStorage.getItem('token');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this
            .http
              .get<GetUsuarioResponse>(environment.API_ENDPOINT + '/usuario', {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<GetUsuarioResponse>) => response.body)
              );
  }

  public cambiarEstadoUsuario(usuario: Usuario) : Observable<Response> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http.put<Response>(environment.API_ENDPOINT + '/cambio/estado/' + usuario.idUsuario, null, {...options, observe: 'response'})
    .pipe(
      map((response: HttpResponse<Response>) => response.body));
  }

  public setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  public setPermiso(permiso: string): void {
    localStorage.setItem('permiso', permiso);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  get loggedUsername(): string {
    return localStorage.getItem('username') || '';
  }

  get loggedRol(): string {
    return localStorage.getItem('permiso') || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get isLogged(): boolean {
    return this.token.length > 0 && this.loggedUsername.length > 0 && this.loggedRol.length > 0;
  }

  get isCliente(): boolean {
    return this.loggedRol === 'ROLE_CLIENTE';
  }

  get isAdmin(): boolean {
    return this.loggedRol === 'ROLE_ADMIN';
  }

  get isProveedor(): boolean {
    return this.loggedRol === 'ROLE_PROVEEDOR';
  }

  cerrarSesion(): void {
    localStorage.clear();
  }
}
