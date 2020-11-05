import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';
import { LegajosResponse } from './modelo/LegajosResponse';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginPruebaService {
  
  //private urlLegajosPersona: string;
  private access_token = 'c84bc575-d650-4b79-8cdc-35b2cc42b1d8';

  constructor(protected http : HttpClient) {

    //let access_token: string = 'c84bc575-d650-4b79-8cdc-35b2cc42b1d8';

    /*this.urlLegajosPersona = 'http://76.252.89.113:8096/seg_rest/parametria/obtenerLegajosPersona.do?access_token=' +
    access_token + '&legajoPersona=';*/
  }

  public probarLogin() : Observable<any> {    
    let httpHeaders = new HttpHeaders({
      'Authorization':'Basic YmJ2YV9jOTIwMzU2OWU5ZjZlNzY5ZGZjOTk5Y2FkMjg5NDk4NzpmNjA3YzZmZGU4MTRjMWEyM2Y0MjQ1MTMxZWUwYzlkNQ==',
      'Content-Type':'application/json'
    });
    let httpParams = new HttpParams()
      .set('grant_type' , 'password')
      .set('username' , 'german.derosa.contractor@bbva.com')
      .set('password' , '1234567q');
    let options = {
      headers : httpHeaders,
      params : httpParams
    }
    this.http.post(environment.API_ENDPOINT + '/oauth/token.do', {responseType: 'json'}, options).subscribe(
      data=>{
        console.log(data);      
        return data;
      },
      err =>{
        console.log(err);
        return err;
      });
    return new Observable<any>();
  }

  public probarPolizasPorLegajo() : Observable<any> {
    let httpHeaders = new HttpHeaders({      
      'Content-Type':'application/json'
    });
    let httpParams = new HttpParams()
      .set('access_token' , '');
    let options = {
      headers : httpHeaders,
      params : httpParams
    }  
    let httpBody = {
      'nroLegajo': '71420',
      'fuerzaVenta': 'false',
      'cargoAbreviado': 'PRO'
    }    
    this.http.post(environment.API_ENDPOINT + '/oauth/token.do',httpBody,options).subscribe(
      data=>{
        console.log(data);
        return data;
      },
      err =>{
        console.log(err);
        return err;
      });
    return ; 
  }

  public probarVariosServicios() {
    let accessToken;

    let httpHeaders = new HttpHeaders({
      'Authorization':'Basic YmJ2YV9jOTIwMzU2OWU5ZjZlNzY5ZGZjOTk5Y2FkMjg5NDk4NzpmNjA3YzZmZGU4MTRjMWEyM2Y0MjQ1MTMxZWUwYzlkNQ==',
      'Content-Type':'application/json'
    });
    let httpParams = new HttpParams()
      .set('grant_type' , 'password')
      .set('username' , 'german.derosa.contractor@bbva.com')
      .set('password' , '1234567q');
    let options = {
      headers : httpHeaders,
      params : httpParams
    }
    this.http.post(environment.API_ENDPOINT + '/oauth/token.do', {responseType: 'json'}, options).subscribe(
    data=>{
      console.log(data);      
      accessToken = data;
      console.log(accessToken);
    });

    httpHeaders = new HttpHeaders({      
      'Content-Type':'application/json'
    });
    httpParams = new HttpParams().set('access_token' , accessToken);
    options = {
      headers : httpHeaders,
      params : httpParams
    }  
    let httpBody = {
      'nroLegajo': '71420',
      'fuerzaVenta': 'false',
      'cargoAbreviado': 'PRO'
    }    
    this.http.post(environment.API_ENDPOINT + '/oauth/token.do', httpBody, options).subscribe(
      data=>{
        console.log(data);
      },
      err =>{
        console.log(err);
      });
    return ; 
  }

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
