import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/shared/services/proveedores.service';
import { Usuario } from 'src/shared/models/domain/usuario';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: Usuario[];

  constructor(private proveedoresService: ProveedoresService, private activatedRoute: ActivatedRoute,
    private router: Router, private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(elem => {
      this.proveedoresService.getProveedoresPorCategoria(Number(elem.get('idCategoria')))
      .subscribe(elem => this.proveedores = elem.usuarios.filter(elem => elem.habilitado),
        error => {
          if (error.error.message === 'Acceso denegado') {
            this.usuarioService.cerrarSesion();
            this.router.navigateByUrl('/login');
            return;
          }
        });
    });
  }

  irAProductos(idProveedor: number): void {
    this.router.navigateByUrl(`productos/`+idProveedor);
  }

}
