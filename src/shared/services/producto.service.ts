import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { ProductosResponse } from '../../shared/models/responses/productos.response';
import { ProductoResponse } from '../../shared/models/responses/producto.response';
import { map } from 'rxjs/operators';
import { RequestCrearProductoBody } from '../models/request/crear.producto.request';
import { RequestModificarProductoBody } from '../models/request/modificar.producto.request';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(protected http : HttpClient) { }

  public getProductos() : Observable<ProductosResponse> {    
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http
      .get<ProductosResponse>(environment.API_ENDPOINT + '/productos', {...options, observe: 'response'})
      .pipe(
        map((response: HttpResponse<ProductosResponse>) => response.body));
  }

  public getProductosPorProveedor() : Observable<ProductosResponse> {    
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http
      .get<ProductosResponse>(environment.API_ENDPOINT + '/productos/proveedor', {...options, observe: 'response'})
      .pipe(
        map((response: HttpResponse<ProductosResponse>) => response.body));
  }

  public getProducto(idProducto: number) : Observable<ProductoResponse> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http
      .get<ProductoResponse>(environment.API_ENDPOINT + '/productos/' + idProducto, {...options, observe: 'response'})
      .pipe(
        map((response: HttpResponse<ProductoResponse>) => response.body));
  }

  public crearProducto(descripcion: string, precio: number, stock: number, imagen: string) : Observable<Response> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let productoReq = new RequestCrearProductoBody(descripcion, precio, stock, imagen);

    let options = {
      headers: httpHeaders
    }

    return this.http.post<Response>(environment.API_ENDPOINT + '/productos', productoReq, {...options, observe: 'response'})
    .pipe(
      map((response: HttpResponse<Response>) => response.body));
  }

  public modificarProducto(idProducto: number, descripcion: string, precio: number, stock: number, imagen: string) : Observable<Response> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    let productoReq = new RequestModificarProductoBody(idProducto, descripcion, precio, stock, imagen);

    return this.http.put<Response>(environment.API_ENDPOINT + '/productos', productoReq, {...options, observe: 'response'})
    .pipe(
      map((response: HttpResponse<Response>) => response.body));
  }

  public eliminarProducto(idProducto: number) : Observable<Response> {
    let token = localStorage.getItem('token');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = {
      headers: httpHeaders
    }

    return this.http.put<Response>(environment.API_ENDPOINT + '/productos/' + idProducto, null, {...options, observe: 'response'})
    .pipe(map((response: HttpResponse<Response>) => response.body));
  }
}
