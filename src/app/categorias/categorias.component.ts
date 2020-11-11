import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/shared/services/categorias.service';
import { Categoria } from 'src/shared/models/domain/categoria';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriasService: CategoriasService, private router: Router, private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe(elem => this.categorias = elem.categorias, 
      error => {
        if (error.error.message === 'Acceso denegado') {
          this.usuarioService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        }
      });
  }

  irAProveedor(idCategoria: number): void {
    this.router.navigateByUrl(`proveedores/${idCategoria}`);
  }

}
