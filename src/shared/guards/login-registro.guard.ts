import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistroGuard implements CanActivate {
  
  constructor(private _usuarioService: UsuariosService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this._usuarioService.isLogged) {
        if (this._usuarioService.isProveedor) {
          this.router.navigateByUrl('/proveedor/productos');
        }
        if (this._usuarioService.isAdmin) {
          this.router.navigateByUrl('/administracion');
        }
        if (this._usuarioService.isCliente) {
          this.router.navigateByUrl('');
        }
        return false;
      }
      return true;
  }
  
}
