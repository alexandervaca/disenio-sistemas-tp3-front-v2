import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Usuario } from 'src/shared/models/domain/usuario';
import { Permiso } from 'src/shared/models/domain/permiso';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cambiarEstadoUsuario(usuario: Usuario): void {
    this.usuariosService.cambiarEstadoUsuario(usuario).subscribe(
      elem => {
        this.cargarUsuarios();
      }, error => {
        if (error.error.message === 'Acceso denegado') {
          this.usuariosService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        } else {
          Swal.fire('Error', "Ocurrió un error al intentar modificar el estado del usuario. En caso de persistir el error contacte con un administrador.", 'error')
        }
      }
    );
  }

  cargarUsuarios(): void {
    this.usuariosService.getAllUsuarios().subscribe(elem => { 
      this.usuarios = elem.usuarios
    }, error => {
      if (error.error.message === 'Acceso denegado') {
        this.usuariosService.cerrarSesion();
        this.router.navigateByUrl('/login');
        return;
      }
      this.usuarios = [];
    });
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
