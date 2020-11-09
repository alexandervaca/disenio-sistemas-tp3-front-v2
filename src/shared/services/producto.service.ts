import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Producto } from '../../shared/models/domain/producto';
import { ProductosResponse } from '../../shared/models/responses/productos.response';
import { ProductoResponse } from '../../shared/models/responses/producto.response';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(protected http : HttpClient) { }

  public getProductos() : Observable<ProductosResponse> {    
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = {
      headers: httpHeaders
    }

    this.http.get(environment.API_ENDPOINT + '/productos', {responseType: 'json'}).subscribe(
      data=>{
        console.log(data);      
        return data;
      },
      err =>{
        console.log(err);
        return err;
      });
    return new Observable<ProductosResponse>();
  }

  public getProducto(idProducto: number) : Observable<ProductoResponse> {

    this.http.get(environment.API_ENDPOINT + '/productos/' + idProducto, {responseType: 'json'})
    .subscribe(
      data=>{
        console.log(data);      
      return data;
      },
      err =>{
        console.log(err);
        return err;
      });

    return new Observable<ProductoResponse>();
  }

  public crearProducto(producto: Producto) : Observable<ProductoResponse> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let productoReq = {
      descripcion: producto.descProducto,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      idProveedor: producto.idProveedor
    }

    let options = {
      headers: httpHeaders
    }

    this.http.post(environment.API_ENDPOINT + '/productos', productoReq, {...options, observe: 'response'})
      .subscribe(
        data=>{
          console.log(data);      
        return data;
        },
        err =>{
          console.log(err);
          return err;
        });

    return new Observable<ProductoResponse>();
  }

  public modificarProducto(producto: Producto) : Observable<any> {

    let productoReq = {
      idProducto: producto.idProducto,
      descripcion: producto.descProducto,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen
    }

    this.http.put(environment.API_ENDPOINT + '/productos', productoReq)
      .subscribe(
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

  public eliminarProducto(idProducto: number) : Observable<any> {

    this.http.delete(environment.API_ENDPOINT + '/productos/' + idProducto)
      .subscribe(
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
}
