export class RequestModificarProductoBody {
    idProducto: number;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;

    constructor(idProducto: number, descripcion: string, precio: number, stock: number, imagen: string) {
        this.idProducto = idProducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}