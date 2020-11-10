import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
  }

  get isLogged(): boolean {
    return this.usuarioService.isLogged;
  }

  get isCliente(): boolean {
    return this.usuarioService.isCliente;
  }

  get isProveedor(): boolean {
    return this.usuarioService.isProveedor;
  }

  get isAdmin(): boolean {
    return this.usuarioService.isAdmin;
  }

  get username(): string {
    return this.usuarioService.loggedUsername;
  }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
  }

}
