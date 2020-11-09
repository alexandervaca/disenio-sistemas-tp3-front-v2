import { Producto } from '../domain/producto';

export class ProductoResponse extends Response{
    producto: Producto;
}