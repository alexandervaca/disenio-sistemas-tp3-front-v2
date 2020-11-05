import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { ProductosResponse } from '../modelo/productoResponse';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private access_token = environment.TOKEN;

  constructor(protected http : HttpClient) { }

  public login() : Observable<any> {    
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

  /**
   * Busca productos por tipo
   * @param searchText 
   */
  public buscarProducto(tipoProducto: string) : Promise<ProductosResponse> {

    return new Promise((resolve, reject) =>{

      this.http.get(environment.API_ENDPOINT + '/parametria/obtenerProductos.do?access_token=' + this.access_token + 
        '&tipoProducto=' + tipoProducto, {responseType: 'json'})
        .subscribe((response: ProductosResponse) => {
          console.log(response);
          resolve(response);
        }, (error: Error) => {
          console.log(error);
          reject(error);
        });
    });
  }

}
