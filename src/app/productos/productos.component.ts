import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/shared/services/producto.service';
import { Producto } from 'src/shared/models/domain/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoDeCompra } from 'src/shared/models/domain/CarritoDeCompra';
import { ProductosCantidades, RequestRealizarCompraBody } from 'src/shared/models/request/crear.compra.request';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { ComprasService } from 'src/shared/services/compras.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  carrito: CarritoDeCompra;
  idProveedor: number;
  idUsuario: number;

  prodsCantidad: ProdCantidad[] = [];

  constructor(private productosService: ProductosService, private usuarioService: UsuariosService,
    private compraService: ComprasService , private activatedRoute: ActivatedRoute, private router: Router) {
    this.carrito = new CarritoDeCompra();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(elem => {
      if (elem.get('idProveedor') != '') {
        this.idProveedor = Number(elem.get('idProveedor'));
        this.getProductos();
        this.usuarioService.getUsuario().subscribe(elem => this.idUsuario = elem.usuario.idUsuario);
      } else {
        this.productosService.getProductosPorProveedor().subscribe(elem => this.productos = []);
      }
    });
  }

  getProductos(): void {
    this.productosService.getProductosPorProveedorSeleccionado(this.idProveedor)
        .subscribe(elem => {
          this.productos = elem.productos.filter(elem => elem.habilitado && elem.stock > 0);
          this.productos.forEach(elem => {
            this.prodsCantidad.push({ producto: elem, cantidadAgregada: 0 });
          });
        }, error => {
          if (error.error.message === 'Acceso denegado') {
            this.usuarioService.cerrarSesion();
            this.router.navigateByUrl('/login');
            return;
          }
          this.productos = [];
        });
  }

  agregarProducto(prodCantidad: ProdCantidad) {
    prodCantidad.cantidadAgregada +=1;
  }

  quitarProducto(prodCantidad: ProdCantidad) {
    prodCantidad.cantidadAgregada -=1;
  }

  disableAgregar(prodCantidad: ProdCantidad): boolean {
    return prodCantidad.producto.stock <= prodCantidad.cantidadAgregada;
  }

  disableEliminar(prodCantidad: ProdCantidad): boolean {
    return prodCantidad.cantidadAgregada === 0;
  }

  disableFinalizarCompra(): boolean {
    return this.prodsCantidad.map(elem => elem.cantidadAgregada).filter(elem => elem > 0).length < 1;
  }

  get total(): number {
    let total = 0;
    this.prodsCantidad.forEach(elem => {
      total += (elem.cantidadAgregada * elem.producto.precio)
    });
    return total;
  }


  realizarCompra(): void {
    console.log(this.idUsuario);
    let productosAComprar: ProductosCantidades[] = [];
    this.prodsCantidad.filter(elem => elem.cantidadAgregada > 0).forEach(elem => {
      productosAComprar.push(new ProductosCantidades(elem.producto.idProducto, elem.cantidadAgregada));
    });
    let body: RequestRealizarCompraBody = new RequestRealizarCompraBody(this.idUsuario, this.idProveedor, productosAComprar);
    this.compraService.comprar(body).subscribe(
      elem => { 
        Swal.fire('Exito', "Compra realizada correctamente.", 'success');
        this.prodsCantidad = [];
        this.getProductos();
      },
      error => {
        if (error.error.message === 'Acceso denegado') {
          this.usuarioService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        } else {
          Swal.fire('Error', "Ocurrió un error al realizar la compra. En caso de persistir el error contacte con un administrador.", 'error')
        }
      }
    );
  }
}

export interface ProdCantidad {
  producto: Producto;
  cantidadAgregada: number;
}
