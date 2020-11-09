import { Producto } from '../domain/producto';

export class ProductosResponse extends Response {
    productos: Producto[];
}