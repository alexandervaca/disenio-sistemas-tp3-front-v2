export class RequestCrearProductoBody {
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;

    constructor(descripcion: string, precio: number, stock: number, imagen: string) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}