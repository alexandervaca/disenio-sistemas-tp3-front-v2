import { Producto } from './producto';

export class Parametria {
    id: number;
    idParametriaLegajo: number;
    orden: string = '';
    descripcionProducto: string = '';
    habilitado: boolean = false;
    tipoCobertura: string = '';
    pathBanner: string = '';
    url: string = '';
    descripcionTodos: string = '';
    productos: Producto[];

    //imagenBanner: Blob;

    constructor(productosParam: Producto[]) {
        this.productos = [];
        productosParam.forEach(prod => {
            let producto : Producto = new Producto();
            producto.rama = prod.rama;
            producto.codigoProducto = prod.codigoProducto;
            producto.codigoProductoGaus = prod.codigoProductoGaus;
            producto.sumaAsegurada = prod.sumaAsegurada;
            producto.descripcion = prod.descripcion;

            this.productos.push(producto);
        });
    }
}