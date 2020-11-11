import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/shared/services/producto.service';
import { Producto } from 'src/shared/models/domain/producto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];

  constructor(private productosService: ProductosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(elem => {
      this.productosService.getProductosPorProveedor().subscribe(elem => this.productos = elem.productos);
    });

  }
  
}
