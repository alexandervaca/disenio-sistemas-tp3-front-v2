export class RequestCrearProductoBody {
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    idProveedor: number;

    constructor(descripcion: string, precio: number, stock: number, imagen: string, idProveedor: number) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.idProveedor = idProveedor;
    }
}