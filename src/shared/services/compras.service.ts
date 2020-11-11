import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RequestRealizarCompraBody } from '../models/request/crear.compra.request';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';

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
}
