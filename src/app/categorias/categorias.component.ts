import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/shared/services/categorias.service';
import { Categoria } from 'src/shared/models/domain/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriasService: CategoriasService, private router: Router) { }

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe(elem => this.categorias = elem.categorias);
  }

  irAProveedor(idCategoria: number): void {
    this.router.navigateByUrl(`proveedores/${idCategoria}`);
  }

}
