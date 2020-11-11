import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/shared/services/producto.service';
import { Producto } from 'src/shared/models/domain/producto';
import { MatDialog } from '@angular/material/dialog';
import { ModificarProductoComponent } from '../modificar-producto/modificar-producto.component';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { error } from 'protractor';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productosproveedor',
  templateUrl: './productosproveedor.component.html',
  styles: []
})
export class ProductosproveedorComponent implements OnInit {

  productos: Producto[];

  constructor(private productosService: ProductosService, private dialog: MatDialog, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
  }

  cambiarEstadoProducto(producto: Producto): void {
    this.productosService.eliminarProducto(producto.idProducto).subscribe(
      elem => { 
        this.getProductos();
       }, error => {
        if (error.error.message === 'Acceso denegado') {
          this.usuarioService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        }
       }
    );
  }

  getProductos(): void {
    this.productosService.getProductosPorProveedor()
    .subscribe(
      elem => { 
        this.productos = elem.productos;
       },
      error => { 
        if (error.error.message === 'Acceso denegado') {
          this.usuarioService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        }
        this.productos = [];
       }
    );
  }

  getHabilitadoDeshabilitado(producto: Producto): string {
    return (producto.habilitado)? 'Habilitado' : 'Deshabilitado';
  }

  modificarProducto(producto: Producto): void {
    this.dialog.open(ModificarProductoComponent, {
      data: {
        producto: producto
      }
    }).afterClosed().subscribe( () => this.getProductos());
  }


  crearProducto(): void {
    this.dialog.open(CrearProductoComponent).afterClosed().subscribe( () => this.getProductos());
  }

}
