import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetNotificacionesResponse } from '../models/responses/notificaciones.response';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) { }

  public getNotificaciones(): Observable<GetNotificacionesResponse> {
    
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
              .get<GetNotificacionesResponse>(environment.API_ENDPOINT + '/notificaciones', {...options, observe: 'response'})
              .pipe(
                retry(3),
                map((response: HttpResponse<GetNotificacionesResponse>) => response.body)
              );
  }
}
