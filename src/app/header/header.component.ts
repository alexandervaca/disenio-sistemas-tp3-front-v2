import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
  }

  get isLogged(): boolean {
    return this.usuarioService.isLogged;
  }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
  }

}
