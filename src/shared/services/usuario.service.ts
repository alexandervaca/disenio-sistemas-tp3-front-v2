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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  username = '';
  permiso = '';

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
    this.username = username;
  }

  public setPermiso(permiso: string): void {
    this.permiso = permiso;
  }

  get loggedUsername(): string {
    return this.username;
  }

  get loggedRol(): string {
    return this.permiso;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get isLogged(): boolean {
    return this.token.length > 0 && this.username.length > 0 && this.permiso.length > 0;
  }

  get isCliente(): boolean {
    return this.permiso === 'ROLE_CLIENTE';
  }

  get isAdmin(): boolean {
    return this.permiso === 'ROLE_ADMIN';
  }

  get isProveedor(): boolean {
    return this.permiso === 'ROLE_PROVEEDOR';
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('permiso');
    this.username = '';
    this.permiso = '';
  }
}
