import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuariosService } from 'src/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _usuarioService: UsuariosService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this._usuarioService.isAdmin) {
        if (this._usuarioService.isProveedor) {
          this.router.navigateByUrl('/proveedor/productos');
        } else {
          this.router.navigateByUrl('/');
        }
      }
      return this._usuarioService.isAdmin;
  }
  
}
