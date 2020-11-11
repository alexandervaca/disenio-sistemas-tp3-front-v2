import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/shared/services/producto.service';
import { Producto } from 'src/shared/models/domain/producto';
import { ActivatedRoute } from '@angular/router';
import { CarritoDeCompra } from 'src/shared/models/domain/CarritoDeCompra';
import { ProductoCantidad } from 'src/shared/models/domain/ProductoCantidad';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  carrito: CarritoDeCompra;

  constructor(private productosService: ProductosService, private activatedRoute: ActivatedRoute) {
    this.carrito = new CarritoDeCompra();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(elem => {
      if (elem.get('idProveedor') != '') {
        this.productosService.getProductosPorProveedorSeleccionado(Number(elem.get('idProveedor'))).subscribe(elem => this.productos = elem.productos);
      } else {
        this.productosService.getProductosPorProveedor().subscribe(elem => this.productos = elem.productos);
      }
    });
  }

  agregarProducto(stock: number, producto: Producto) {
    if (stock > 0) {
      let productoCantidad: ProductoCantidad = new ProductoCantidad();
      productoCantidad.productoId = producto.idProducto;
      productoCantidad.cantidad += 1;
      this.carrito.addProductoCantidad(productoCantidad);
      let prod = this.productos.find(p => p.idProducto = producto.idProducto);
      prod.stock--; 
    }
  }

  quitarProducto(producto: Producto) {

  }
}
