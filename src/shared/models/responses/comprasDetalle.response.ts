import { CompraProducto } from '../domain/compraProducto';

export class ComprasDetalleResponse extends Response {
  comprasProducto: CompraProducto[];
}