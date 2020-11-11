import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RequestRealizarCompraBody } from '../models/request/crear.compra.request';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { ComprasResponse } from '../models/responses/compras.response';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(protected http : HttpClient) { }

  public comprar(body: RequestRealizarCompraBody) : Observable<Response> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http.post<Response>(environment.API_ENDPOINT + '/compra', body, {...options, observe: 'response'})
    .pipe(
      map((response: HttpResponse<Response>) => response.body));
  }

  public getCompras(): Observable<ComprasResponse> {
    let token = localStorage.getItem('token');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http.get<ComprasResponse>(environment.API_ENDPOINT + '/compras', {...options, observe: 'response'})
          .pipe(map((response: HttpResponse<ComprasResponse>) => response.body));
  }
}
