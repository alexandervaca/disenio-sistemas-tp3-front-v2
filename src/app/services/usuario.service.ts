import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { LegajosResponse } from '../modelo/LegajosResponse';
import { error } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private access_token = environment.TOKEN;

  constructor(protected http : HttpClient) { }

  public login() : Promise<any> {    
    let httpHeaders = new HttpHeaders({
      //'Authorization':'Basic YmJ2YV9jOTIwMzU2OWU5ZjZlNzY5ZGZjOTk5Y2FkMjg5NDk4NzpmNjA3YzZmZGU4MTRjMWEyM2Y0MjQ1MTMxZWUwYzlkNQ==',
      'Content-Type':'application/json'
    });
    let httpParams = new HttpParams()
      .set('username' , 'cliente1')
      .set('password' , 'cliente1');
    let options = {
      headers : httpHeaders,
      params : httpParams
    }
    let body = {
      username: 'CLIENTE',
      password: 'CLIENTE'
    }

    return new Promise((resolve, reject) =>{
      
      this.http.post(environment.API_ENDPOINT + '/login', body).subscribe(
        (response: any) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  /**
   * Busca por numero de legajo y nombre de persona
   * @param searchText 
   */
  public buscarLegajosPersona(searchText: string) : Promise<LegajosResponse> {

    return new Promise((resolve, reject) =>{

      this.http.get(environment.API_ENDPOINT + '/parametria/obtenerLegajosPersona.do?access_token=' + this.access_token + 
        '&legajoPersona=' + searchText, {responseType: 'json'})
        .subscribe((response: LegajosResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

}
