import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Usuario } from 'src/shared/models/domain/usuario';
import { Permiso } from 'src/shared/models/domain/permiso';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cambiarEstadoUsuario(usuario: Usuario): void {
    this.usuariosService.cambiarEstadoUsuario(usuario).subscribe(
      elem => {
        this.cargarUsuarios();
      }
    );
  }

  cargarUsuarios(): void {
    this.usuariosService.getAllUsuarios().subscribe(elem => this.usuarios = elem.usuarios);
  }

  getRol(permiso: Permiso): string {
    switch (permiso.descPermiso) {
      case 'ROLE_ADMIN':
        return 'Administrador';
      case 'ROLE_PROVEEDOR':
        return 'Proveedor';
      case 'ROLE_CLIENTE':
        return 'Cliente';
      default:
        return '';
    }
  }

}
