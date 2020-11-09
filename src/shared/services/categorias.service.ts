import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasResponse } from 'src/shared/models/responses/categorias.response';
import { retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public getCategorias(): Observable<CategoriasResponse> {
    
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
              .get<CategoriasResponse>(environment.API_ENDPOINT + '/categorias', {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<CategoriasResponse>) => response.body)
              );
  }
}
