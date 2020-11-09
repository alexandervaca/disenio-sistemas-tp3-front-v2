import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Producto } from '../modelo/producto';
import { ProductosResponse } from '../modelo/productosResponse';
import { ProductoResponse } from '../modelo/productoResponse';
import { CategoriaResponse } from '../modelo/categoriaResponse';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private access_token = environment.TOKEN;

  constructor(protected http : HttpClient) { }

  public getCategorias() : Observable<CategoriaResponse> {    
    
    this.http.get(environment.API_ENDPOINT + '/categorias', {responseType: 'json'}).subscribe(
      data=>{
        console.log(data);      
        return data;
      },
      err =>{
        console.log(err);
        return err;
      });
    return new Observable<CategoriaResponse>();
  }

  public getProductos() : Observable<ProductosResponse> {    
    
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

    let productoReq = {
      descripcion: producto.descProducto,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      idProveedor: producto.idProveedor
    }

    this.http.post(environment.API_ENDPOINT + '/productos', productoReq)
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
