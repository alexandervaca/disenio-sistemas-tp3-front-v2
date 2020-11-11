export class RequestRealizarCompraBody {
    clienteId: number;
	proveedorId: number;
    productosCantidades: ProductosCantidades[];
    
    constructor(clienteId: number, proveedorId: number, productosCantidades: ProductosCantidades[]) {
        this.clienteId = clienteId;
        this.proveedorId = proveedorId;
        this.productosCantidades = productosCantidades;
    }
}

export class ProductosCantidades {
    productoId: number;
    cantidad: number;
    
    constructor(productoId: number, cantidad: number) {
        this.productoId = productoId;
        this.cantidad = cantidad;
    }
}