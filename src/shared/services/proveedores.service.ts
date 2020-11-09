import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, map } from 'rxjs/operators';
import { GetUsuariosResponse } from '../models/responses/proveedores.response';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  public getProveedoresPorCategoria(categoriaId: number): Observable<GetUsuariosResponse> {
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
              .get<GetUsuariosResponse>(environment.API_ENDPOINT + '/proveedores/' + categoriaId, {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<GetUsuariosResponse>) => response.body)
              );
  }
}
