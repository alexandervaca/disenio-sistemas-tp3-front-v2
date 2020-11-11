import { ProductoCantidad } from './ProductoCantidad';

export class CarritoDeCompra {
  clienteId: number;
  proveedorId: number;
  productosCantidades: ProductoCantidad[] = [];

  CarritoDeCompra(clienteId: number, proveedorId: number) {
    this.clienteId = clienteId;
    this.proveedorId = proveedorId;
  }

  addProductoCantidad(productoCantidad: ProductoCantidad) {
    this.productosCantidades.push(productoCantidad);
  }

  removeProductoCantidad(productoId: number) {
    this.productosCantidades = this.productosCantidades.filter(pc => pc.productoId !== productoId);
  }
}