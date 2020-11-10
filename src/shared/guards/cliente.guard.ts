import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {
  constructor(private _usuarioService: UsuariosService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this._usuarioService.isCliente) {
        if (this._usuarioService.isProveedor) {
          this.router.navigateByUrl('/proveedor/productos');
        } else if(this._usuarioService.isAdmin){
          this.router.navigateByUrl('/administracion');
        }  else {
          this.router.navigateByUrl('/');
        }
      }
      return this._usuarioService.isCliente;
  }
  
}
